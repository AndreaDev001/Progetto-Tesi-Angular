import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { CostumErrorStateMatcher } from 'src/app/CostumErrorStateMatcher';
import { Discussion } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';

export interface CreateDiscussion
{
  title: string,
  topic: string
}
@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.component.html',
  styleUrls: ['./create-discussion.component.css']
})
export class CreateDiscussionComponent {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    topic: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  })
  public discussionIcon: IconDefinition = faDiscourse;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private discussionService: DiscussionService,private router: Router) {

  }

  public handleSubmit(event: any): void {
    if(this.title != undefined && this.topic != undefined && this.formGroup.valid) {
      let createDiscussion: CreateDiscussion = {title: this.title.value,topic: this.topic.value};
      this.formGroup.reset();
      this.submitEvent.emit(createDiscussion);
      this.discussionService.createDiscussion(createDiscussion).subscribe((value: Discussion) => {
        this.successEvent.emit(value);
      },(err: any) => this.failedEvent.emit(err));
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get title() {
    return this.formGroup.get("title");
  }
  get topic() {
    return this.formGroup.get("topic");
  }
}
