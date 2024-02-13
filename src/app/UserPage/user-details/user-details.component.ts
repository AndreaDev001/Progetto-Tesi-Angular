import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faMessage, faPoll, faTable, faTasks, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TextOverflowItem } from 'src/app/Utility/text-overflow/text-overflow.component';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { Board, BoardMember, Discussion, PagedModel, PaginationRequest, Poll, PollVote, TaskAssignment, User } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { DiscussionService } from 'src/model/services/discussion.service';
import { PollService } from 'src/model/services/poll.service';

interface DescriptionItem
{
  icon: IconDefinition
  amount: number
  tooltip?: string
}
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements AfterViewInit, OnDestroy{

  @Input() user: User | undefined = undefined;

  public descriptionItems: DescriptionItem[] = [];
  public personIcon: IconDefinition = faUserCircle;
  public boardIcon: IconDefinition = faTable;
  public taskIcon: IconDefinition = faTasks;
  public discussionIcon: IconDefinition = faMessage;
  public pollIcon: IconDefinition = faPoll;

  public currentJoinedBoards: BoardMember[] = [];
  public currentAssignedTasks: TaskAssignment[] = [];
  public currentDiscussions: Discussion[] = [];
  public currentPolls: Poll[] = [];

  public currentJoinedBoardsPage: number = 0;
  public currentJoinedBoardsTotalPages: number = 0;
  public currentAssignedTasksPage: number = 0;
  public currentAssignedTasksTotalPages: number = 0;
  public currentDiscussionsPage: number = 0;
  public currentDiscussionsTotalPages: number = 0;
  public currentPollPage: number = 0;
  public currentPollTotalPages: number = 0;

  public joinedBoardsItems: TextOverflowItem[] = [];
  public assignedTasksItems: TextOverflowItem[] = [];
  public discussionItems: TextOverflowItem[] = [];
  public pollsItem: TextOverflowItem[] = [];

  @ViewChild("taskAssignedCardTemplate") taskAssignedTemplate: any;
  @ViewChild("joinedBoardCardTemplate") joinedBoardTemplate: any;
  @ViewChild("discussionCardTemplate") discussionTemplate: any;
  @ViewChild("pollCardTemplate") pollTemplate: any;

  private currentUserID: string | undefined = undefined;
  private subscriptions: Subscription[] = [];
  
  constructor(private discussionService: DiscussionService,private taskAssignmentService: TaskAssignmentService,private pollService: PollService,private boardMemberService: BoardMemberService) {

  }

  public updateDiscussions(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.discussionService.getDiscussionsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentDiscussions.push.apply(this.currentDiscussions,value._embedded.content);
        value._embedded.content.forEach((value: any) => this.discussionItems.push({template: this.discussionTemplate,context: value}));
      }
      if(value.page != undefined) {
        this.currentDiscussionsPage = value.page.page;
        this.currentDiscussionsTotalPages = value.page.totalPages;
      }
    })
  }

  public updateAssignments(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.taskAssignmentService.getTaskAssignmentsByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentAssignedTasks.push.apply(this.currentAssignedTasks,value._embedded.content);
        console.log(this.currentAssignedTasks);
        value._embedded.content.forEach((value: any) => this.assignedTasksItems.push({template: this.taskAssignedTemplate,context: value}));
      }
      if(value.page != undefined) {
        this.currentAssignedTasksPage = value.page.page;
        this.currentAssignedTasksTotalPages = value.page.totalPages;
      }
    })
  }

  public updatePolls(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.pollService.getPollsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentPolls.push.apply(this.currentPolls,value._embedded.content);
        value._embedded.content.forEach((value: any) => this.pollsItem.push({template: this.pollTemplate,context: value}));
      }
      if(value.page != undefined) {
        this.currentPollPage = value.page.page;
        this.currentPollTotalPages = value.page.totalPages;
      }
    })
  }

  public updateJoinedBoards(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.boardMemberService.getBoardMembersByMember(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        this.currentJoinedBoards.push.apply(this.currentJoinedBoards,value._embedded.content);
        console.log(this.currentJoinedBoards);
        value._embedded.content.forEach((value: any) => this.joinedBoardsItems.push({template: this.joinedBoardTemplate,context: value}));
      }
      if(value.page != undefined) {
        this.currentJoinedBoardsPage = value.page.page;
        this.currentJoinedBoardsTotalPages = value.page.totalPages;
      }
    })
  }

  public updateJoinedBoardsMaxPage(): void {
    if(this.currentJoinedBoardsPage + 1 < this.currentJoinedBoardsTotalPages) {
      this.currentJoinedBoardsPage++;
      this.updateJoinedBoards(this.currentJoinedBoardsPage,20);
    }
  }

  public updateTaskAssignmentsMaxPage(): void {
    if(this.currentAssignedTasksPage + 1 < this.currentAssignedTasksTotalPages) {
      this.currentAssignedTasksPage++;
      this.updateAssignments(this.currentAssignedTasksPage,20);
    }
  }

  public updateDiscussionsMaxPage(): void {
    if(this.currentDiscussionsPage + 1 < this.currentDiscussionsTotalPages) {
      this.currentDiscussionsPage++;
      this.updateDiscussions(this.currentDiscussionsPage,20);
    }
  }

  public updatePollMaxPages(): void {
    if(this.currentPollPage + 1 < this.currentPollTotalPages) {
      this.currentPollPage++;
      this.updatePolls(this.currentPollPage,20);
    }
  }

  public ngAfterViewInit(): void {
    if(this.user != undefined) 
    {
      this.currentUserID = this.user.id;
      this.descriptionItems = [];
      this.descriptionItems.push({amount: this.user.amountOfJoinedBoards,icon: faTable });
      this.descriptionItems.push({amount: this.user.amountOfAssignedTasks,icon: faTasks});
      this.descriptionItems.push({amount: this.user.amountOfCreatedDiscussions,icon: faMessage});
      this.descriptionItems.push({amount: this.user.amountOfCreatedPolls,icon: faPoll});
      this.descriptionItems.push({amount: this.user.amountOfCreatedVotes,icon: faCheck})
      this.currentDiscussionsPage = 0;
      this.currentJoinedBoardsPage = 0;
      this.currentAssignedTasksPage = 0;
      this.currentPollPage = 0;
      this.updateJoinedBoards(this.currentJoinedBoardsPage,20);
      this.updateAssignments(this.currentAssignedTasksPage,20);
      this.updateDiscussions(this.currentDiscussionsPage,20);
      this.updatePolls(this.currentPollPage,20);

    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
