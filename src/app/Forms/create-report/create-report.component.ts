import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from 'src/app/Utility/dropdown/dropdown.component';
import { CommentReportService } from 'src/app/comment-report.service';
import { CollectionModel, TaskReport } from 'src/model/interfaces';
import { DiscussionReportService } from 'src/model/services/discussion-report.service';
import { PollReportService } from 'src/model/services/poll-report.service';
import { ReportService } from 'src/model/services/report.service';
import { TaskReportService } from 'src/model/services/task-report.service';


export interface CreateReport
{
  title: string,
  description: string,
  reason: string,
}
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  
  @Input() reportedID: string | undefined = undefined;
  @Input() taskID: string | undefined = undefined;
  @Input() pollID: string | undefined = undefined;
  @Input() commentID: string | undefined = undefined;
  @Input() discussionID: string | undefined = undefined;
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    description: new FormControl<String>('',[Validators.required,Validators.minLength(10),Validators.maxLength(60)]),
    reason: new FormControl<String>('',Validators.required)
  })
  public reasons: string[] = [];
  public reportIcon: IconDefinition = faWarning;

  constructor(private reportService: ReportService,private taskReportService: TaskReportService,private commentReportService: CommentReportService,private discussionReportService: DiscussionReportService,private pollReportService: PollReportService) {

  }

  public ngOnInit(): void {
    this.reportService.getReasons().subscribe((value: CollectionModel) => {
      this.reasons = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    })
  }

  public handleSubmit(event: any): void {
    if(this.title != undefined && this.description != undefined && this.reason != undefined && this.formGroup.valid) 
    {
       let createReport: CreateReport = {title: this.title,description: this.description,reason: this.reason};
       if(this.reportedID != undefined) {
        this.reportService.createReport(createReport,this.reportedID).subscribe((value: any) => {
          console.log(value);
        })
        return;
       }
       if(this.taskID != undefined) {
        this.taskReportService.createTaskReport(createReport,this.taskID).subscribe((value: any) => {
          console.log(value);
        })
        return;
       }
       if(this.pollID != undefined) {
        this.pollReportService.createPollReport(createReport,this.pollID).subscribe((value: any) => {
          console.log(value);
        })
        return;
       }
       if(this.commentID != undefined) {
        this.commentReportService.createCommentReport(createReport,this.commentID).subscribe((value: any) => {
          console.log(value);
        })
        return;
       }
       if(this.discussionID != undefined) {
        this.discussionReportService.createDiscussionReport(createReport,this.discussionID).subscribe((value: any) => {
          console.log(value);
        })
        return;
       }
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }
  
  get title(): any {return this.formGroup.get("title")};
  get description(): any {return this.formGroup.get("description")};
  get reason(): any {return this.formGroup.get("reason")};
}

