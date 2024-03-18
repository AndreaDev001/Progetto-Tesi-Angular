import { Component,Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faCalendarPlus, faComment, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Discussion, DiscussionLike, DiscussionReport } from 'src/model/interfaces';
import { DiscussionLikeService } from 'src/model/services/discussion-like.service';
import { DiscussionReportService } from 'src/model/services/discussion-report.service';

interface DescriptionItem
{
  icon: IconDefinition,
  amount: string
}
@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent implements OnInit, OnDestroy{
  @Input() discussion: Discussion | undefined = undefined;
  public discussionIcon: IconDefinition = faMessage;
  public descriptionItems: DescriptionItem[] = [];
  private subscriptions: Subscription[] = [];
  public isOwner: boolean = false;

  public currentReport: DiscussionReport | undefined = undefined;
  public currentLike: DiscussionLike | undefined = undefined;
  
  public searchingLike: boolean = false;
  public seachingReport: boolean = false;

  @ViewChild("createReportTemplate") createReportTemplate: any;
  @ViewChild("createDiscussionTemplate") createDiscussionTemplate: any;

  constructor(private authHandler: AuthHandlerService,public alertHandlerService: AlertHandlerService,private discussionReportService: DiscussionReportService,private discussionLikeService: DiscussionLikeService) {

  }

  public ngOnInit(): void {
    this.descriptionItems.push({icon: faHeart,amount: this.discussion!!.amountOfReceivedLikes.toString()});
    this.descriptionItems.push({icon: faComment,amount: this.discussion!!.amountOfReceivedComments.toString()});
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
      this.isOwner = value == this.discussion?.publisher.id 
      this.searchReport();
      this.searchLike();
    }));
  }

  public searchReport(): void {
    if(this.discussion == undefined)
        return;
    this.seachingReport = true;
    this.discussionReportService.getReportBetween(this.discussion.id,this.authHandler.getCurrentUserID(true)).subscribe((value: any) => {
      this.seachingReport = false;
      this.currentReport = value;
    },(err: any) => {
      this.seachingReport = false;
      this.currentReport = undefined;
    });
  }

  public searchLike(): void {
    if(this.discussion == undefined)
        return;
      this.searchingLike = true;
      this.discussionLikeService.getLikeBetween(this.discussion.id,this.authHandler.getCurrentUserID(true)).subscribe((value: any) => {
        this.searchingLike = false;
        this.currentLike = value;
      },(err: any) => {
        this.searchingLike = false;
        this.currentLike = undefined;
      })
  }

  public updateLike(): void {
    if(this.discussion == undefined)
        return;
    let callback: (success: boolean,value: any) => void = (success: boolean,value: any) => {
      this.searchingLike = success;
      this.currentLike = value;
    }
    if(this.currentLike == undefined)
        this.discussionLikeService.createDiscussionLike(this.discussion.id).subscribe((value: any) => {
        callback(true,value)
        this.discussion!!.amountOfReceivedLikes = this.discussion!!.amountOfReceivedLikes + 1;
        this.descriptionItems[0].amount = this.discussion!!.amountOfReceivedLikes.toString();
      },(err: any) => callback(false,undefined))
    else
        this.discussionLikeService.deleteDiscussionLike(this.currentLike.id).subscribe((value: any) => {
          this.currentLike = undefined;
          this.discussion!!.amountOfReceivedLikes = this.discussion!!.amountOfReceivedLikes - 1;
          this.descriptionItems[0].amount = this.discussion!!.amountOfReceivedLikes.toString();
        })
  }

  public ngOnDestroy(): void {
      this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public addReport(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createReportTemplate);
    this.alertHandlerService.open();
  }

  public modifyDiscussion(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createDiscussionTemplate);
    this.alertHandlerService.open();
  }
}
