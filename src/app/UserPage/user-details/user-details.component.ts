import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faMessage, faPoll, faTable, faTasks, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TaskAssigmentService } from 'src/app/task-assigment.service';
import { BoardMember, Discussion, PagedModel, PaginationRequest, Poll, PollVote, TaskAssignment, User } from 'src/model/interfaces';
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
export class UserDetailsComponent implements OnChanges, OnDestroy{

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
  public currentVotes: PollVote[] = [];
  private currentUserID: string | undefined = undefined;
  private subscriptions: Subscription[] = [];
  
  constructor(private discussionService: DiscussionService,private taskAssignmentService: TaskAssigmentService,private pollService: PollService,private boardMemberService: BoardMemberService) {

  }

  public updateDiscussions(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.discussionService.getDiscussionsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined) {
        if(value._embedded.content != undefined)
            this.currentDiscussions = value._embedded.content;
      }
    })
  }

  public updateAssignments(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    console.log("HERE");
    this.taskAssignmentService.getTaskAssigmentsByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      console.log("HERE");
      if(value._embedded != undefined) {
        if(value._embedded.content != undefined)
            this.currentAssignedTasks = value._embedded.content;
      }
    })
  }

  public updatePolls(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.pollService.getPollsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined) {
        if(value._embedded.content != undefined)
            this.currentPolls = value._embedded.content;
      }
    })
  }

  public updateJoinedBoards(currentPage: number,currentPageSize: number): void {
    let paginationRequest: PaginationRequest = {page: currentPage,pageSize: currentPageSize};
    this.boardMemberService.getBoardMembersByMember(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      if(value._embedded != undefined) {
        if(value._embedded.content != undefined)
            this.currentJoinedBoards = value._embedded.content;
      }
    })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['user'] != undefined && this.user != undefined) {
      this.currentUserID = this.user.id;
      this.descriptionItems = [];
      this.descriptionItems.push({amount: this.user.amountOfJoinedBoards,icon: faTable });
      this.descriptionItems.push({amount: this.user.amountOfAssignedTasks,icon: faTasks});
      this.descriptionItems.push({amount: this.user.amountOfCreatedDiscussions,icon: faMessage});
      this.descriptionItems.push({amount: this.user.amountOfCreatedPolls,icon: faPoll});
      this.descriptionItems.push({amount: this.user.amountOfCreatedVotes,icon: faCheck})
      this.updateDiscussions(0,20);
      this.updateJoinedBoards(0,20);
      this.updateAssignments(0,20);
      this.updatePolls(0,20);
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
