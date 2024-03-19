import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faComments, faPoll } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { PollOptionService } from 'src/model/services/poll-option.service';
import { CollectionModel, PagedModel, Poll, PollComment, PollOption, PollVote } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';
import { TextOverflowItem } from 'src/app/Utility/components/text-overflow/text-overflow.component';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { PollVoteService } from 'src/model/services/poll-vote.service';
import { PollCommentService } from 'src/model/services/poll-comment.service';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.css']
})
export class PollPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];

  @Input() pollID: any = undefined;
  public currentPoll: Poll | undefined = undefined;

  public pollIcon: IconDefinition = faPoll;
  public optionIcon: IconDefinition = faCheckToSlot;
  public commentsIcon: IconDefinition = faComments;

  public searchingPoll: boolean = false;
  public searchingPollOptions: boolean = false;
  public searchingCurrentVotedOption: boolean = false;
  public searchingComments: boolean = false;

  public currentSelectedOption: any = undefined;

  public currentPollOptions: PollOption[] = [];
  public currentPollOptionsItems: TextOverflowItem[] = [];
  public currentComments: PollComment[] = [];
  public currentCommentsItems: TextOverflowItem[] = [];
  public isOwner: boolean = false;

  public currentVotedOption: PollVote | undefined = undefined;

  @ViewChild("createOptionTemplate") createOptionTemplate: any;
  @ViewChild("createCommentTemplate") createCommentTemplate: any;
  @ViewChild("optionTemplate") optionTemplate: any;
  @ViewChild("commentTemplate") commentTemplate: any;

  constructor(private activatedRoute: ActivatedRoute,private authHandler: AuthHandlerService,private pollCommentService: PollCommentService,private pollVoteService: PollVoteService,private pollService: PollService,private pollOptionService: PollOptionService,public alertHandlerService: AlertHandlerService) {
    
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      this.pollID = value.id;
      this.getPoll();
      this.getPollOptions();
      this.getPollComments();
      this.getCurrentVotedOption();
    }));
  }

  private getPoll(): void {
    if(this.pollID != undefined) {
      this.searchingPoll = true;
      let callback: (searchValue: boolean,pollValue: Poll | undefined,pollID: string | undefined) => void =  (searchValue: boolean,pollValue: Poll | undefined,pollID: string | undefined) => {
        this.searchingPoll = searchValue;
        this.currentPoll = pollValue;
        this.pollID = pollID;
        if(this.currentPoll != undefined) {
          this.isOwner = this.currentPoll.publisher.id == this.authHandler.getCurrentUserID(true);
        }
      }
      this.pollService.getPollByID(this.pollID).subscribe((value: any) => callback(false,value,this.pollID),(err: any) => callback(false,undefined,undefined));
    }
  }

  private getCurrentVotedOption(): void {
    if(this.pollID != undefined) {
      this.searchingCurrentVotedOption = true;
      let callback: (first: boolean,value: any) => void = (searching: boolean,value: any) => {
        this.searchingCurrentVotedOption = searching;
        this.currentVotedOption = value;
      }
      this.pollVoteService.getCurrentVotedOption(this.pollID).subscribe((value: any) => callback(false,value),(err: any) => callback(false,undefined));
    }
  }

  private getPollOptions(): void {
    if(this.pollID != undefined) {
      this.searchingPollOptions = true;
      this.pollOptionService.getPollOptionsByPoll(this.pollID).subscribe((value: CollectionModel) => {
        this.searchingPollOptions = false;
        this.currentPollOptions = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPollOptions.forEach((current: PollOption) => {
          let overflowItem: TextOverflowItem = {template: this.optionTemplate,context: current};
          this.currentPollOptionsItems.push(overflowItem);
        },(err: any) => {
          this.searchingPollOptions = false;
          this.currentPollOptions = [];
          this.currentPollOptionsItems = [];
        })
      })
    }
  }

  private getPollComments(): void {
    if(this.pollID != undefined) {
      this.searchingComments = true;
      this.pollCommentService.getCommentsByPoll(this.pollID).subscribe((value: CollectionModel) => {
        this.searchingComments = false;
        this.currentComments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentComments.forEach((current: PollComment) => {
          let overflowItem: TextOverflowItem = {template: this.commentTemplate,context: current};
          this.currentCommentsItems.push(overflowItem);
        },(err: any) => {
          this.searchingComments = false;
          this.currentComments = [];
          this.currentCommentsItems = [];
        })
      })
    }
  }

  public deleteOption(event: any): void {
    this.currentPollOptions = this.currentPollOptions.filter((current: any) => current.id !== event.id);
    this.currentPollOptionsItems = this.currentPollOptionsItems.filter((current: any) => current.context.id !== event.id);
  }

  public deleteComment(event: any): void {
    this.currentComments = this.currentComments.filter((current: any) => current.id !== event.id);
    this.currentCommentsItems = this.currentCommentsItems.filter((current: any) => current.context.id !== event.id);
  }

  public updateCurrentVote(vote: PollVote): void {
    this.currentVotedOption = vote;
  }

  public createOption(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createOptionTemplate);
    this.alertHandlerService.open();
  }

  public createComment(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createCommentTemplate);
    this.alertHandlerService.open();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
