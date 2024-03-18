import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/model/services/comment.service';
import { CollectionModel, Comment, Discussion, DiscussionComment, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';
import { TextOverflowItem } from 'src/app/Utility/text-overflow/text-overflow.component';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { DiscussionCommentService } from 'src/model/services/discussion-comment.service';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.css']
})
export class DiscussionPageComponent implements OnInit, OnDestroy {
  
  private subscriptions: Subscription[] = [];
  public discussionID: any = undefined;
  public publisherID: any = undefined;

  public discussionIcon: IconDefinition = faMessage;
  public commentIcon: IconDefinition = faComment;

  public searchingDiscussion: boolean = false;
  public searchingComments: boolean = false;

  public currentDiscussion: Discussion | undefined = undefined;
  public currentComments: DiscussionComment[] = [];
  public currentCommentItems: TextOverflowItem[] = [];
  public currentSelectedComment: DiscussionComment | undefined = undefined;

  @ViewChild("commentTemplate") commentTemplate: any;
  @ViewChild("createCommentTemplate") createCommentTemplate: any;
  
  constructor(private discussionService: DiscussionService,private discussionCommentService: DiscussionCommentService,private activatedRoute: ActivatedRoute,public alertHandlerService: AlertHandlerService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.discussionID = value.id;
        this.searchDiscussion();
        this.searchComments();
      }
    }));
  }

  private searchDiscussion(): void {
    this.searchingDiscussion = true;
    this.discussionService.getDiscussionById(this.discussionID).subscribe((value: Discussion) => {
      this.searchingDiscussion = false;
      this.currentDiscussion = value;
      this.publisherID = value.publisher.id;
    },(err: any) => {
      this.searchingDiscussion = false;
      this.currentDiscussion = undefined;
      this.publisherID = undefined;
    })
  }

  public searchComments(): void {
    this.searchingComments = true;
    this.discussionCommentService.getCommentsByDiscussion(this.discussionID).subscribe((value: CollectionModel) => {
      console.log(value);
      this.searchingComments = false;
      this.currentComments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      value._embedded.content.forEach((current: any) => {
        let overflowItem: TextOverflowItem = {template: this.commentTemplate,context: current};
        this.currentCommentItems.push(overflowItem);
      })
    },(err: any) => {
      this.searchingComments = false;
      this.currentComments = [];
      this.currentCommentItems = [];
    })
  }

  public createComment(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createCommentTemplate);
    this.alertHandlerService.open();
  }

  public addComment(event: any): void {
    this.currentComments.push(event);
    this.currentCommentItems.push({template: this.commentTemplate,context: event});
  }

  public deleteComment(comment: DiscussionComment): void {
    this.currentComments = this.currentComments.filter((current: any) => current.id !== comment.id);
    this.currentCommentItems = this.currentCommentItems.filter((current: any) => current.context.id !== comment.id);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
