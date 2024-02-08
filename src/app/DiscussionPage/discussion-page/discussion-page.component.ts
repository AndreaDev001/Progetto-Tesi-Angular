import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/comment.service';
import { Comment, Discussion, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.css']
})
export class DiscussionPageComponent implements OnInit, OnDestroy {
  
  private subscriptions: Subscription[] = [];
  public discussionID: any = undefined;
  public discussionIcon: IconDefinition = faMessage;
  public currentDiscussion: Discussion | undefined = undefined;
  public currentComments: Comment[] = [];
  public currentPage: number = 0;
  public currentPageSize: number = 20;
  public currentTotalPages: number = 0;
  
  constructor(private discussionService: DiscussionService,private commentService: CommentService,private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.discussionID = value.id;
        this.discussionService.getDiscussionById(value.id).subscribe((value: Discussion) => {
          this.currentDiscussion = value;
          this.updateCurrentComments({page: this.currentPage,pageSize: this.currentPageSize})
        });
      }
    }));
  }

  private updateCurrentComments(page: PaginationRequest): void {
    if(this.discussionID != undefined) {
      this.commentService.getCommentsByDiscussion(this.discussionID,page).subscribe((value: PagedModel) => {
        if(value._embedded != undefined && value._embedded.content != undefined) {
          this.currentComments = value._embedded.content;
          if(value._embedded.page != undefined) {
            this.currentPage = value._embedded.page.page;
            this.currentPageSize = value._embedded.page.size;
            this.currentTotalPages = value._embedded.page.totalPages;
          }
        }
      })
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
