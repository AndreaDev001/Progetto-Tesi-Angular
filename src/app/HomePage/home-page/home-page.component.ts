import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { faHandsWash, faHandshake, faMessage, faPoll, faTable, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { Board, BoardInvite, BoardMember, Discussion, PagedModel, PaginationRequest, Poll, Task, TaskAssignment } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { TaskService } from 'src/model/services/task.service';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { DiscussionService } from 'src/model/services/discussion.service';
import { PollService } from 'src/model/services/poll.service';
import { BoardInviteService } from 'src/model/services/board-invite.service';
import { TextOverflowItem } from 'src/app/Utility/components/text-overflow/text-overflow.component';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';

interface OptionTemplate
{
  name: string,
  icon: IconDefinition,
  path: string,
  requiredTemplate: any;
}
interface DescriptionItem
{
  name: string,
  icon: IconDefinition,
  subtitle: string
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild("boardTemplate") boardTemplate: any;
  @ViewChild("boardInvitesTemplate") boardInvitesTemplate: any;
  @ViewChild("tasksTemplate") taskTemplate: any;
  @ViewChild("discussionTemplate") discussionTemplate: any;
  @ViewChild("pollTemplate") pollTemplate: any;


  private subscriptions: Subscription[] = [];

  public currentTemplate: TemplateRef<any> | undefined = undefined;
  public currentViewPath: string = "boards";

  public currentBoards: BoardMember[] = [];
  public currentBoardInvites: BoardInvite[] = [];
  public currentTasks: TaskAssignment[] = [];
  public currentDiscussions: Discussion[] = [];
  public currentPolls: Poll[] = [];

  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public currentSelectedIndex: number = 0;

  public optionsTemplate: OptionTemplate[] = [];
  public welcomeBackIcon: IconDefinition = faHandshake;

  public boardIcon: IconDefinition = faTable;
  public taskIcon: IconDefinition = faTasks;
  public discussionIcon: IconDefinition = faDiscourse;
  public invitesIcon: IconDefinition = faMessage;
  public pollIcon: IconDefinition = faPoll;
  public isSearching: boolean = false;

  private currentUserID: any = undefined;
  public currentUser: any = undefined;

  public descriptionItems: DescriptionItem[] = [];
  public items: TextOverflowItem[] = [];

  constructor(private authHandler: AuthHandlerService,private boardInvitesService: BoardInviteService,private boardMemberService: BoardMemberService,private taskAssignmentService: TaskAssignmentService,private discussionService: DiscussionService,private pollService: PollService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngAfterViewInit(): void 
  {
    this.descriptionItems.push({name: "Boards",subtitle: "Here you can see all of the boards you partecipate in",icon: this.boardIcon})
    this.descriptionItems.push({name: "Tasks",subtitle: "Here you can see all of the tasks that have been assigned to you",icon: this.taskIcon})
    this.descriptionItems.push({name: "Discussions",subtitle: "Here you can see all of the discussions that have been assingned to you",icon: this.discussionIcon})
    this.descriptionItems.push({name: "Invites",subtitle: "Here you can see all of the invites that you have received",icon: this.invitesIcon})
    this.descriptionItems.push({name: "Polls",subtitle: "Here you can see all of the polls that you have created",icon: this.pollIcon});
    this.optionsTemplate.push({name: "Boards",icon: faTable,requiredTemplate: this.boardTemplate,path: "boards"});
    this.optionsTemplate.push({name: "Tasks",icon: faTasks,requiredTemplate: this.taskTemplate,path: "tasks"});
    this.optionsTemplate.push({name: "Invites",icon: faMessage,requiredTemplate: this.boardInvitesTemplate,path: "invites"});
    this.optionsTemplate.push({name: "Discussions",icon: faDiscourse,requiredTemplate: this.discussionTemplate,path: "discussions"});
    this.optionsTemplate.push({name: "Polls",icon: faPoll,requiredTemplate: this.pollTemplate,path: "polls"});

    this.subscriptions.push(this.activatedRoute.queryParams.subscribe((value: any) => {
      let view: string = value.view;
      if(view == null) 
      {
        this.currentTemplate = this.boardTemplate;
        this.currentViewPath = "boards";
        this.updateRouter(this.currentViewPath);
      }
      else if(this.currentUserID != undefined) {
        this.updateItems(view);
      }
    }))
    this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
      this.currentUserID = value;
      if(this.currentUserID != undefined) {
        this.updateItems(this.currentViewPath);
      }
    });
  }


  public updateJoinedBoards(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.boardMemberService.getBoardMembersByMember(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = true;
      this.currentBoards = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.isSearching = false;
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    })
  }

  public updateTasks(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.isSearching = true;
    this.taskAssignmentService.getTaskAssignmentsByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentTasks = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    })
  }

  public updateInvites(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.isSearching = true;
    this.boardInvitesService.getInvitesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentBoardInvites = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    });
  }

  public updateDiscussions(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.isSearching = true;
    this.discussionService.getDiscussionsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentDiscussions = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    })
  }

  public updatePolls(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.isSearching = true;
    this.pollService.getPollsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentPolls = value._embedded != undefined && value._embedded.content == undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    })
  }

  public resetPage(): void {
    this.currentPage = 0;
    this.currentTotalPages = 0;
    this.currentTotalElements = 0;
    this.updateItems(this.currentViewPath);
  }

  public handlePageChange(event: any): void {
    this.currentPage = event;
    this.updateItems(this.currentViewPath);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  private updateRouter(path: string): void {
    this.router.navigate(['home'],{
      queryParams: {view: path},
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  private updateItems(view: string): void 
  {
    switch(view) 
    {
      case "boards":
        this.currentTemplate = this.boardTemplate;
        this.currentViewPath = 'boards';
        this.currentSelectedIndex = 0;
        this.updateJoinedBoards(this.currentPage,20);
        break;
      case "tasks":
        this.currentTemplate = this.taskTemplate;
        this.currentViewPath = 'tasks';
        this.currentSelectedIndex = 1;
        this.updateTasks(this.currentPage,20);
        break;
      case "invites":
        this.currentTemplate = this.boardInvitesTemplate;
        this.currentViewPath = 'invites';
        this.currentSelectedIndex = 2;
        this.updateInvites(this.currentPage,20);
        break;
      case "discussions":
        this.currentTemplate = this.discussionTemplate;
        this.currentViewPath = 'discussions';
        this.currentSelectedIndex = 3;
        this.updateDiscussions(this.currentPage,20);
        break;
      case "polls":
        this.currentTemplate = this.pollTemplate;
        this.currentViewPath = 'polls';
        this.currentSelectedIndex = 4;
        this.updatePolls(this.currentPage,20);
        break;
      default:
        this.currentTemplate = this.boardTemplate;
        this.currentViewPath = 'boards';
        this.currentSelectedIndex = 0;
        this.updateJoinedBoards(this.currentPage,20);
        break;
    }
  }

  public updateTemplate(event: any,requiredTemplate: any,path: string): void {
    this.resetPage();
    this.currentTemplate = requiredTemplate;
    this.currentViewPath = path;
    this.updateRouter(path);
  }
}
