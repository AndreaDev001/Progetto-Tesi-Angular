import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { Discussion, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';


@Component({
  selector: 'app-discussion-options',
  templateUrl: './discussion-options.component.html',
  styleUrls: ['./discussion-options.component.css']
})
export class DiscussionOptionsComponent implements OnChanges {

  @Input() publisherID: number | undefined = undefined;
  @Input() discussionID: number | undefined = undefined;

  public userIcon: IconDefinition = faUser;
  public discussionIcon: IconDefinition = faMessage;
  
  public currentPublisherDiscussions: Discussion[] = [];
  public currentSimilarDiscussions: Discussion[] = [];
  public currentPublisherPage: number = 0;
  public currentSimilarPage: number = 0;
  
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
        this.currentPublisherDiscussions = value._embedded.content;
      }
    })
  }
  
  private updateSimilarDiscussions(page: PaginationRequest): void {
    this.discussionService.getSimilarDiscussions(this.discussionID,page).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentSimilarDiscussions = value._embedded.content;
      }
    })
  }
}
