import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll, faUser } from '@fortawesome/free-solid-svg-icons';
import { Page, PagedModel, PaginationRequest, Poll } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-poll-options',
  templateUrl: './poll-options.component.html',
  styleUrls: ['./poll-options.component.css']
})
export class PollOptionsComponent implements OnChanges {

  @Input() publisherID: string | undefined = undefined;
  @Input() pollID: string | undefined = undefined;

  public userIcon: IconDefinition = faUser;
  public pollIcon: IconDefinition = faPoll;

  public currentPublisherPolls: Poll[] = [];
  public currentSimilarPolls: Poll[] = [];
  public currentPublisherPage: number = 0;
  public currentPublisherTotalPages: number = 0;
  public currentSimilarPage: number = 0;
  public currentSimilarTotalPages: number = 0;

  constructor(private pollService: PollService) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['publisherID'] != undefined && this.publisherID != undefined) {
      this.currentPublisherPage = 0;
      this.currentPublisherTotalPages = 0;
      this.updatePublisherPolls({page: this.currentPublisherPage,pageSize: 20});
    }
    if(changes['pollID'] != undefined && this.pollID != undefined) {
      this.currentSimilarPage = 0;
      this.currentSimilarTotalPages = 0;
      this.updateSimilarPolls({page: this.currentPublisherPage,pageSize: 20});
    }
  }

  public updatePublisherPolls(page: PaginationRequest): void {
    this.pollService.getPollsByPublisher(this.publisherID,page).subscribe((value: PagedModel) => {
      if(value._embedded != undefined) {
        if(value._embedded.content != undefined) {
          this.currentPublisherPolls.push.apply(this.currentPublisherPolls,value._embedded.content);
        }
        if(value._embedded.page != undefined) {
          this.currentPublisherPage = value._embedded.page.page;
          this.currentPublisherTotalPages = value._embedded.page.totalPages;
        }
      }
    })
  }
  public updateSimilarPolls(page: PaginationRequest): void {
    this.pollService.getSimilarPolls(this.pollID,page).subscribe((value: PagedModel) => {
      if(value._embedded != undefined) {
        if(value._embedded.content != undefined) {
          this.currentSimilarPolls.push.apply(this.currentSimilarPolls,value._embedded.content);
        }
        if(value._embedded.page != undefined) {
          this.currentPublisherPage = value._embedded.page.page;
          this.currentPublisherTotalPages = value._embedded.page.totalPages;
        }
      }
    })
  }
}
