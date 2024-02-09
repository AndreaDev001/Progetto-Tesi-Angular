import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { TextOverflowItem } from 'src/app/Utility/text-overflow/text-overflow.component';
import { Discussion, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';


@Component({
  selector: 'app-discussion-options',
  templateUrl: './discussion-options.component.html',
  styleUrls: ['./discussion-options.component.css']
})
export class DiscussionOptionsComponent implements OnChanges {

  @Input() publisherID: string | undefined = undefined;
  @Input() discussionID: string | undefined = undefined;

  public userIcon: IconDefinition = faUser;
  public discussionIcon: IconDefinition = faMessage;
  
  public currentPublisherDiscussions: Discussion[] = [];
  public currentSimilarDiscussions: Discussion[] = [];
  public currentPublisherPage: number = 0;
  public currentPublisherTotalPages: number = 0;
  public currentSimilarPage: number = 0;
  public currentTotalSimilarPages: number = 0;

  public publisherItems: TextOverflowItem[] = [];
  public similarItems: TextOverflowItem[] = [];

  @ViewChild("discussionTemplate") discussionTemplate: any;
  
  constructor(private discussionService: DiscussionService) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['publisherID'] != undefined && this.publisherID != undefined) {
      this.updatePublisherDiscussions({page: this.currentPublisherPage,pageSize: 20});
    }
    if(changes['discussionID'] != undefined && this.discussionID != undefined) {
      this.updateSimilarDiscussions({page: this.currentSimilarPage,pageSize: 20});
    }
  }

  private updatePublisherDiscussions(page: PaginationRequest): void {
    this.discussionService.getDiscussionsByPublisher(this.publisherID,page).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentPublisherDiscussions.push.apply(this.currentPublisherDiscussions,value._embedded.content);
        for(let current of value._embedded.content) {
          let overflowItem: TextOverflowItem = {context: current,template: this.discussionTemplate};
          this.publisherItems.push(overflowItem);
        }
      }
      if(value.page != undefined) {
        this.currentPublisherPage = value.page.page;
        this.currentPublisherTotalPages = value.page.totalPages;
      }
    })
  }
  
  private updateSimilarDiscussions(page: PaginationRequest): void {
    this.discussionService.getSimilarDiscussions(this.discussionID,page).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentSimilarDiscussions.push.apply(this.currentSimilarDiscussions,value._embedded.content);
        for(let current of value._embedded.content) {
          let overflowItem: TextOverflowItem = {context: current,template: this.discussionTemplate};
          this.similarItems.push(overflowItem);
        }
      }
      if(value.page != undefined) {
        this.currentSimilarPage = value.page.page;
        this.currentTotalSimilarPages = value.page.totalPages;
      }
    })
  }

  public updatePublisherMaxPage(): void {
    if(this.currentPublisherPage + 1 < this.currentPublisherTotalPages)
    {
      this.currentPublisherPage++;
      let paginationRequest: PaginationRequest = {page: this.currentPublisherPage,pageSize: 20};
      this.updatePublisherDiscussions(paginationRequest);
    }
  }
  public updateSimilarMaxPage(): void {
    if(this.currentTotalSimilarPages + 1 < this.currentTotalSimilarPages) {
      this.currentSimilarPage++;
      let paginationRequest: PaginationRequest = {page: this.currentSimilarPage,pageSize: 20};
      this.updateSimilarDiscussions(paginationRequest);
    }
  }
}
