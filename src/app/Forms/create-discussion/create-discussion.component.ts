import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { CostumErrorStateMatcher } from 'src/app/CostumErrorStateMatcher';
import { CreateDiscussion } from 'src/model/create';
import { Discussion } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';
import { UpdateDiscussion } from 'src/model/update';

@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.component.html',
  styleUrls: ['./create-discussion.component.css']
})
export class CreateDiscussionComponent implements OnInit {
  @Input() update: boolean = false;
  @Input() discussionID: any = undefined;
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    topic: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    text: new FormControl('',[Validators.required,Validators.minLength(3)])
  })
  public discussionIcon: IconDefinition = faDiscourse;
  public searchingDiscussion: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private discussionService: DiscussionService,private router: Router) {

  }

  public ngOnInit(): void {
    if(this.update && this.discussionID != undefined) {
      this.searchingDiscussion = true;
      this.discussionService.getDiscussionById(this.discussionID).subscribe((value: any) => {
        this.searchingDiscussion = false;
        this.formGroup.get("title")?.setValue(value.title);
        this.formGroup.get("topic")?.setValue(value.topic);
        this.formGroup.get("text")?.setValue(value.text);
      },(err: any) => this.searchingDiscussion = false)
    }
  }


  public handleSubmit(event: any): void {
    if(this.title != undefined && this.topic != undefined && this.text != undefined && this.formGroup.valid) {
      if(!this.update) {
        let createDiscussion: CreateDiscussion = {title: this.title.value,topic: this.topic.value,text: this.text.value};
        this.submitEvent.emit(createDiscussion);
        this.formGroup.reset();
        this.discussionService.createDiscussion(createDiscussion).subscribe((value: Discussion) => {
          this.successEvent.emit(value);
        },(err: any) => this.failedEvent.emit(err));
      }
      else
      {
        let updateDiscussion: UpdateDiscussion = {discussionID: this.discussionID!!,title: this.title.value,topic: this.topic.value,text: this.text.value};
        this.submitEvent.emit(updateDiscussion);
        this.formGroup.reset();
        this.discussionService.updateDiscussion(updateDiscussion).subscribe((value: Discussion) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
      }
    }

  }

  public reset(): void {
    this.formGroup.reset();
  }
  get title(): any {return this.formGroup.get("title")};
  get topic(): any {return this.formGroup.get("topic")};
  get text(): any {return this.formGroup.get("text")};
}
