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
  public searchingSimilarDiscussions: boolean = false;
  public searchingPublisherDiscussions: boolean = false;

  @ViewChild("discussionTemplate") discussionTemplate: any;
  
  constructor(private discussionService: DiscussionService) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['publisherID'] != undefined && this.publisherID != undefined) {
      this.updatePublisherDiscussions({page: this.currentPublisherPage,pageSize: 20},false);
    }
    if(changes['discussionID'] != undefined && this.discussionID != undefined) {
      this.updateSimilarDiscussions({page: this.currentSimilarPage,pageSize: 20},false);
    }
  }

  private updatePublisherDiscussions(page: PaginationRequest,scroll: boolean): void {
    this.searchingSimilarDiscussions = !scroll;
    this.discussionService.getDiscussionsByPublisher(this.publisherID,page).subscribe((value: PagedModel) => {
      this.searchingPublisherDiscussions = false;
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
    },(err: any) => this.searchingPublisherDiscussions = false)
  }
  
  private updateSimilarDiscussions(page: PaginationRequest,scroll: boolean): void {
    this.searchingSimilarDiscussions = !scroll; 
    this.discussionService.getSimilarDiscussions(this.discussionID,page).subscribe((value: PagedModel) => {
      this.searchingSimilarDiscussions = false;
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
    },(err: any) => this.searchingSimilarDiscussions = false)
  }

  public updatePublisherMaxPage(): void {
    if(this.currentPublisherPage + 1 < this.currentPublisherTotalPages)
    {
      this.currentPublisherPage++;
      let paginationRequest: PaginationRequest = {page: this.currentPublisherPage,pageSize: 20};
      this.updatePublisherDiscussions(paginationRequest,true);
    }
  }
  public updateSimilarMaxPage(): void {
    if(this.currentTotalSimilarPages + 1 < this.currentTotalSimilarPages) {
      this.currentSimilarPage++;
      let paginationRequest: PaginationRequest = {page: this.currentSimilarPage,pageSize: 20};
      this.updateSimilarDiscussions(paginationRequest,true);
    }
  }
}
