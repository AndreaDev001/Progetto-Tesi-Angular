import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Subscription, first } from 'rxjs';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Poll, PollLike, PollReport } from 'src/model/interfaces';
import { PollLikeService } from 'src/model/services/poll-like.service';
import { PollReportService } from 'src/model/services/poll-report.service';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnChanges,OnDestroy {
  @Input() poll: Poll | undefined = undefined;

  public calendarIcon: IconDefinition = faCalendar;
  public likeIcon: IconDefinition = faHeart;

  public isOwner: boolean = false;
  private subscriptions: Subscription[] = [];

  public searchingLike: boolean = false;
  public searchingReport: boolean = false;

  public currentLike: PollLike | undefined = undefined;
  public currentReport: PollReport | undefined = undefined;

  @ViewChild("createReportTemplate") createReportTemplate: any;
  @ViewChild("modifyPollTemplate") modifyPollTemplate: any;

  constructor(private authHandler: AuthHandlerService,private pollService: PollService,private router: Router,private pollLikeService: PollLikeService,private pollReportService: PollReportService,public alertHandlerService: AlertHandlerService) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(this.poll != undefined) 
    {
      this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
        this.isOwner = value == this.poll!!.publisher.id;
        this.searchReport();
        this.searchLike();
      }));
    }
  }

  private searchReport(): void {
    this.searchingReport = true;
    let callback: (first: boolean,second: any) => void = (searching: boolean,value: PollReport | undefined) => {
      this.searchingReport = searching;
      this.currentReport = value;
    }
    this.pollReportService.getReportBetween(this.poll!!.id,this.authHandler.getCurrentUserID(true)).subscribe((value: any) => callback(false,value),(err: any) => callback(false,undefined));
  }

  private searchLike(): void {
    this.searchingLike = true;
    let callback: (first: boolean,second: any) => void = (searching: boolean,value: PollLike | undefined) => {
        this.searchingLike = searching;
        this.currentLike = value;
    }
    this.pollLikeService.getLikeBetween(this.poll!!.id,this.authHandler.getCurrentUserID(true)).subscribe((value: any) => callback(false,value),(err: any) => callback(false,undefined));
  }

  public updateLike(): void {
    let requiredObservable: any = this.currentLike == undefined ? this.pollLikeService.createLike(this.poll!!.id) : this.pollLikeService.deleteLike(this.currentLike.id);
    let callback: (value: any) => void = this.currentLike == undefined ? (value: any) => this.currentLike = value : () => this.currentLike = undefined;
    requiredObservable.subscribe((value: any) => {
      callback(value);
    },(err: any) => callback(undefined));
  }

  public ngOnDestroy(): void {
      this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public createReport(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createReportTemplate);
    this.alertHandlerService.open();
  }

  public modifyPoll(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.modifyPollTemplate);
    this.alertHandlerService.open();
  }

  public deletePoll(): void {
    if(this.poll != undefined) {
      this.pollService.deletePoll(this.poll.id).subscribe((value: any) => {
        this.router.navigate(['/home']);
      })
    }
  }
}
