import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faCalendarDay, faGear, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { Comment, DiscussionComment, PollComment, TaskComment } from 'src/model/interfaces';
import { CommentRef } from 'src/model/refs';
import { CommentLikeService } from 'src/model/services/comment-like.service';
import { CommentReportService } from 'src/model/services/comment-report.service';
import { CommentService } from 'src/model/services/comment.service';
import { TaskReportService } from 'src/model/services/task-report.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit,OnDestroy {

  public subscriptions: Subscription[] = [];
  public currentComment: Comment | undefined = undefined;
  public isOwner: boolean = false;
  public hasLiked: boolean = false;
  public hasReported: boolean = false;
  @Input() commentRef: CommentRef | undefined = undefined;
  @Input() taskComment: TaskComment | undefined = undefined;
  @Input() discussionComment: DiscussionComment | undefined = undefined;
  @Input() pollComment: PollComment | undefined = undefined;
  public likeIcon: IconDefinition = faHeart;
  public calendarIcon: IconDefinition = faCalendarDay;
  @Output() modifiedEvent: EventEmitter<any> = new EventEmitter();
  @Output() deletedEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild("addReportTemplate") addReportTemplate: any;
  @ViewChild("modifyCommentTemplate") modifyCommentTemplate: any;

  constructor(public alertHandlerService: AlertHandlerService,private commentService: CommentService,private commentReportService: CommentReportService,private commentLikeService: CommentLikeService,private authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {
    if(this.taskComment != undefined)
        this.currentComment = {id: this.taskComment.id,createdDate: this.taskComment.createdDate,title: this.taskComment.title,text: this.taskComment.text,publisher: this.taskComment.publisher,amountOfReceivedLikes: this.taskComment.amountOfLikes};
    if(this.discussionComment != undefined)
        this.currentComment = {id: this.discussionComment.id,createdDate: this.discussionComment.createdDate,title: this.discussionComment.title,text: this.discussionComment.text,publisher: this.discussionComment.publisher,amountOfReceivedLikes: this.discussionComment.amountOfLikes};
    if(this.pollComment != undefined)
        this.currentComment = {id: this.pollComment.id,createdDate: this.pollComment.createdDate,title: this.pollComment.title,text: this.pollComment.text,publisher: this.pollComment.publisher,amountOfReceivedLikes: this.pollComment.amountOfLikes};
      this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
        this.isOwner = value == this.currentComment?.publisher.id;
        this.updateItems();
      }));
  }
  
  public updateItems(): void {
    if(this.currentComment != undefined) {
      this.commentReportService.hasReported(this.authHandler.getCurrentUserID(true),this.currentComment.id).subscribe((value: any) => this.hasReported = true,(err: any) => this.hasReported = false);
      this.commentLikeService.hasLiked(this.authHandler.getCurrentUserID(true),this.currentComment.id).subscribe((value: any) => this.hasLiked = true,(err: any) => this.hasLiked = false);
    }
  }

  public updateLike(): void {
    if(this.hasLiked) {
      if(this.currentComment != undefined) {
        this.commentLikeService.deleteLikeByComment(this.currentComment.id).subscribe((value: any) => {
          this.hasLiked = false;
          if(this.currentComment != undefined)
              this.currentComment.amountOfReceivedLikes = this.currentComment.amountOfReceivedLikes - 1;
        })
      }
    }
    else
    {
      if(this.currentComment != undefined) {
        this.commentLikeService.createLike(this.currentComment?.id).subscribe((value: any) => {
          this.hasLiked = true;
          if(this.currentComment != undefined)
              this.currentComment.amountOfReceivedLikes = this.currentComment.amountOfReceivedLikes + 1;
        })
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public modifyComment(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.modifyCommentTemplate);
    this.alertHandlerService.open();
  }

  public deleteComment(): void {
    if(this.currentComment != undefined) 
      this.commentService.deleteComment(this.currentComment.id).subscribe((value: any) => this.deletedEvent.emit());
  
  }

  public addReport(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.addReportTemplate);
    this.alertHandlerService.open();
  }
}
