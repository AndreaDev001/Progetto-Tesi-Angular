import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TabPaneOption } from '../../../Utility/tab-pane/tab-pane.component';
import { IconDefinition, faComment, faHeart, faPoll, faTasks, faTextSlash } from '@fortawesome/free-solid-svg-icons';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { Comment, CommentLike, Discussion, DiscussionLike, PagedModel, PaginationRequest, Poll, PollLike, Task, TaskLike } from 'src/model/interfaces';
import { TextOverflowItem } from '../../../Utility/text-overflow/text-overflow.component';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from 'src/model/services/discussion.service';
import { PollService } from 'src/model/services/poll.service';
import { DiscussionLikeService } from 'src/model/services/discussion-like.service';
import { CommentLikeService } from 'src/model/services/comment-like.service';
import { PollLikeService } from '../../../../model/services/poll-like.service';
import { TaskLikeService } from '../../../../model/services/task-like.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-like-pages',
  templateUrl: './like-pages.component.html',
  styleUrls: ['./like-pages.component.css']
})
export class LikePagesComponent implements AfterViewInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  private currentUserID: any = undefined;
  public routerPath: string | undefined = undefined;

  public options: TabPaneOption[] = [];
  public likeIcon: IconDefinition = faHeart;

  @ViewChild("likedTasks") likedTasks: any;
  @ViewChild("likedPolls") likedPolls: any;
  @ViewChild("likedDiscussions") likedDiscussions: any;
  @ViewChild("likedComments") likedComments: any;

  public tabs: any[] = [];

  public currentLikedDiscussions: DiscussionLike[] = [];
  public currentLikedPolls: PollLike[] = [];
  public currentLikedTasks: TaskLike[] = [];
  public currentLikedComments: CommentLike[] = [];

  public currentLikedDiscussionsPage: number = 0;
  public currentLikedDiscussionsTotalPages: number = 0;
  public currentLikedDiscussionsTotalElements: number = 0;

  public currentLikedPollsPage: number = 0;
  public currentLikedPollsTotalPages: number = 0;
  public currentLikedPollsTotalElements: number = 0;

  public currentLikedTasksPage: number = 0;
  public currentLikedTasksTotalPages: number = 0;
  public currentLikedTasksTotalElements: number= 0;

  public currentLikedCommentsPage: number = 0;
  public currentLikedCommentsTotalPages: number = 0;
  public currentLikedCommentsTotalElements: number = 0;

  public currentTemplate: any = undefined;

  constructor(private activatedRoute: ActivatedRoute,private discussionLikeService: DiscussionLikeService,private pollLikeService: PollLikeService,private taskLikeService: TaskLikeService,private commentLikeService: CommentLikeService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.currentUserID = value.id;
        this.routerPath = "/likes/" + this.currentUserID;
      }
    }));
    this.options.push({name: "Liked Discussions",icon: faDiscourse,subtitle: "View the discussions you liked",callback: () => {}});
    this.options.push({name: "Liked Polls",icon: faPoll,subtitle: "View the polls you liked",callback: () => {}});
    this.options.push({name: "Liked Tasks",icon: faTasks,subtitle: "View the tasks you liked",callback: () => {}});
    this.options.push({name: "Liked Comments",subtitle: "View the comments you liked",icon: faComment,callback: () => {}});
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public ngAfterViewInit(): void {
    this.currentTemplate = this.likedDiscussions;
    this.updateLikedDiscussions(this.currentLikedDiscussionsPage,20);
    this.tabs.push(this.likedDiscussions);
    this.tabs.push(this.likedPolls);
    this.tabs.push(this.likedTasks);
    this.tabs.push(this.likedComments);  
  }

  public updateLikedDiscussions(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.discussionLikeService.getDiscussionLikesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentLikedDiscussions = value._embedded != undefined  && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentLikedDiscussionsPage = value.page.page;
        this.currentLikedDiscussionsTotalPages = value.page.totalPages;
        this.currentLikedDiscussionsTotalElements = value.page.totalElements;
      }
    })
  }

  public updateLikedPolls(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.pollLikeService.getPollLikesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentLikedPolls = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentLikedPollsPage = value.page.page;
        this.currentLikedPollsTotalPages = value.page.totalPages;
        this.currentLikedPollsTotalElements = value.page.totalElements;
      }
    })
  }

  public updateLikedTasks(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.taskLikeService.getTaskLikesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentLikedTasks = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined)  {
        this.currentLikedTasksPage = value.page.page;
        this.currentLikedTasksTotalPages = value.page.totalPages;
        this.currentLikedTasksTotalElements = value.page.totalElements;
      }
    })
  }

  public updateLikedComments(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.commentLikeService.getCommentLikesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentLikedComments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
         this.currentLikedCommentsPage = value.page.page;
         this.currentLikedCommentsTotalPages = value.page.totalPages;
         this.currentLikedCommentsTotalElements = value.page.totalElements;
      }
    })
  }

  public updatePage(index: number,event: any): void 
  {
    switch(index) {
      case 0:
        this.currentLikedDiscussionsPage = event;
        this.updateLikedDiscussions(this.currentLikedDiscussionsPage,20);
        break;
      case 1:
        this.currentLikedPollsPage = event;
        this.updateLikedPolls(this.currentLikedPollsPage,20);
        break;
      case 2:
        this.currentLikedTasksPage = event;
        this.updateLikedTasks(this.currentLikedTasksPage,20);
        break;
      case 3:
        this.currentLikedCommentsPage = event;
        this.updateLikedComments(this.currentLikedCommentsPage,20);
        break;
    }
  }

  public handlePageChange(event: any): void {
    console.log(event);
    this.updatePage(0,event);
  }
  public resetSearch(event: number) 
  {
    switch(event)
    {
      case 0:
        this.currentLikedDiscussionsPage = 0;
        this.currentLikedDiscussionsTotalPages = 0;
        this.updateLikedDiscussions(this.currentLikedDiscussionsPage,20);
        break;
      case 1:
        this.currentLikedPollsPage = 0;
        this.currentLikedPollsTotalPages = 0;
        this.updateLikedPolls(this.currentLikedPollsPage,20);
        break;
      case 2:
        this.currentLikedTasksPage = 0;
        this.currentLikedTasksTotalPages = 0;
        this.updateLikedTasks(this.currentLikedTasksPage,20);
        break;
      case 3:
        this.currentLikedCommentsPage = 0;
        this.currentLikedCommentsTotalPages = 0;
        this.updateLikedComments(this.currentLikedCommentsPage,20);
        break;
    }
  }

  public handleTabChange(event: number): void {
    this.currentTemplate = this.tabs[event] != undefined ? this.tabs[event] : this.tabs[0];
    this.resetSearch(event);
  }
}
