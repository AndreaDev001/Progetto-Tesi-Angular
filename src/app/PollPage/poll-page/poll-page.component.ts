import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faPoll } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { PollOptionService } from 'src/model/services/poll-option.service';
import { PagedModel, Poll, PollOption } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.css']
})
export class PollPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentPollID: string | undefined = undefined;
  public currentPoll: Poll | undefined = undefined;
  public pollIcon: IconDefinition = faPoll;
  public optionIcon: IconDefinition = faCheckToSlot;
  public pollOptions: PollOption[] = [];
  public currentPollOptionPage: number = 0;
  public currentPollOptionTotalPages: number = 0;

  constructor(private activatedRoute: ActivatedRoute,private pollService: PollService,private pollOptionService: PollOptionService) {
    
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      this.currentPollID = value.id;
      if(this.currentPollID != undefined) {
        this.pollService.getPollByID(this.currentPollID).subscribe((value: Poll) => this.currentPoll = value);
        this.pollOptionService.getPollOptionsByPoll(this.currentPollID,{page: this.currentPollOptionPage,pageSize: 20}).subscribe((value: PagedModel) => {
          if(value._embedded != undefined && value._embedded.content != undefined)
              this.pollOptions = value._embedded.content;
          if(value.page != undefined) {
            this.currentPollOptionPage = value.page.page;
            this.currentPollOptionPage = value.page.totalPages;
          }
        })
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
