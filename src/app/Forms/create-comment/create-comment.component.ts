import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Validators } from 'ngx-editor';
import { CreateComment } from 'src/model/create';
import { Comment } from 'src/model/interfaces';
import { CommentService } from 'src/model/services/comment.service';
import { DiscussionCommentService } from 'src/model/services/discussion-comment.service';
import { DiscussionService } from 'src/model/services/discussion.service';
import { PollCommentService } from 'src/model/services/poll-comment.service';
import { TaskCommentService } from 'src/model/services/task-comment.service';
import { UpdateComment } from 'src/model/update';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  @Input() taskID: string | undefined = undefined;
  @Input() update: boolean = false;
  @Input() commentID: any = undefined;
  @Input() discussionID: string | undefined = undefined;
  @Input() pollID: string | undefined = undefined;
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required(),Validators.minLength(3),Validators.maxLength(20)]),
    text: new FormControl('',[Validators.required(),Validators.minLength(10),Validators.maxLength(200)])
  })
  public commentIcon: IconDefinition = faMessage;
  public searchingComment: boolean = false;
  public currentComment: Comment | undefined = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private taskCommentService: TaskCommentService,private commentService: CommentService,private discussionCommentService: DiscussionCommentService,private pollCommentService: PollCommentService) {

  }

  public ngOnInit(): void {
    if(this.update && this.commentID != undefined) {
      this.searchingComment = true;
      this.commentService.getCommentByID(this.commentID).subscribe((value: any) => {
        this.currentComment = value;
        this.searchingComment = false;
        this.formGroup.get("title")?.setValue(this.currentComment?.title);
        this.formGroup.get("text")?.setValue(this.currentComment?.text);
      },(err: any) => this.searchingComment = false)
    }  
  }

  public handleSubmit(event: any): void {
    if(this.title != undefined && this.text != undefined && this.formGroup.valid) {
      if(!this.update) {
        let createComment: CreateComment = {title: this.title.value,text: this.text.value};
        this.submitEvent.emit(createComment);
        let requiredObservable: any = undefined;
        if(this.taskID != undefined)
            requiredObservable = this.taskCommentService.createComment(createComment,this.taskID);
        if(this.discussionID != undefined)
            requiredObservable = this.discussionCommentService.createComment(createComment,this.discussionID);
        if(this.pollID != undefined)
            requiredObservable = this.pollCommentService.createComment(createComment,this.pollID);
        requiredObservable.subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
      }
      else
      {
        let updateComment: UpdateComment = {commentID: this.commentID,title: this.title.value,text: this.text.value};
        this.submitEvent.emit(updateComment);
        this.commentService.updateComment(updateComment).subscribe((value: any) => {
          this.successEvent.emit(value);
        },(err: any) => this.failedEvent.emit(err));

      }
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get title(): any {return this.formGroup.get("title")};
  get text(): any {return this.formGroup.get("text")}
}
