import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { faHandsWash, faHandshake, faMessage, faPoll, faTable, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { Board, BoardInvite, BoardMember, Discussion, PagedModel, Poll, Task } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { TaskService } from 'src/model/services/task.service';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { AuthenticationHandlerService } from 'src/app/authentication-handler.service';
import { DiscussionService } from 'src/model/services/discussion.service';
import { PollService } from 'src/model/services/poll.service';
import { BoardInviteService } from 'src/model/services/board-invite.service';

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
  public currentPage: number = 0;
  public currentPageSize: number = 20;
  public currentTotalElements: number = 0;
  public currentTemplate: TemplateRef<any> | undefined = undefined;
  public currentViewPath: string = "boards";

  public currentBoards: BoardMember[] = [];
  public currentBoardInvites: BoardInvite[] = [];
  public currentTasks: Task[] = [];
  public currentDiscussions: Discussion[] = [];
  public currentPolls: Poll[] = [];

  public optionsTemplate: OptionTemplate[] = [];
  public welcomeBackIcon: IconDefinition = faHandshake;

  public boardIcon: IconDefinition = faTable;
  public taskIcon: IconDefinition = faTasks;
  public discussionIcon: IconDefinition = faDiscourse;
  public invitesIcon: IconDefinition = faMessage;
  public pollIcon: IconDefinition = faPoll;
  public isSearching: boolean = false;
  public currentSelectedElement: any;
  public elements: any = undefined;

  private currentUserID: any = undefined;
  public currentUser: any = undefined;

  public descriptionItems: DescriptionItem[] = [];

  constructor(private authenticationHandler: AuthenticationHandlerService,private boardInvitesService: BoardInviteService,private boardMemberService: BoardMemberService,private taskAssignmentService: TaskAssignmentService,private discussionService: DiscussionService,private pollService: PollService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngAfterViewInit(): void {
    this.elements = document.getElementsByClassName("option-holder");
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
      if(view == null) {
        this.currentTemplate = this.boardTemplate;
        this.currentViewPath = "boards";
        this.updateRouter(this.currentViewPath);
      }
      else
      {
        switch(view) {
          case "boards":
            this.currentTemplate = this.boardTemplate;
            this.currentViewPath = 'boards';
            break;
          case "invites":
            this.currentTemplate = this.boardInvitesTemplate;
            this.currentViewPath = 'invites';
            break;
          case "tasks":
            this.currentTemplate = this.taskTemplate;
            this.currentViewPath = 'tasks';
            break;
          case "discussions":
            this.currentTemplate = this.discussionTemplate;
            this.currentViewPath = 'discussions';
            break;
          case "polls":
            this.currentTemplate = this.pollTemplate;
            this.currentViewPath = 'polls';
            break;
          default:
            this.currentTemplate = this.boardTemplate;
            this.currentViewPath = 'boards';
            break;
        }
        this.updateSelection(this.currentViewPath);
        this.updateRouter(this.currentViewPath);
      }
    }))
    this.subscriptions.push(this.authenticationHandler.getCurrentUser(false).subscribe((value: any) => this.currentUser = value));
    this.subscriptions.push(this.authenticationHandler.getCurrentUserID(false).subscribe((value: any) => this.currentUserID = value));
  }

  private updateSelection(path: string): any {
    for(let current of this.elements) {

      if(current.textContent.toLowerCase() == path) {
        this.currentSelectedElement = current;
        this.currentSelectedElement.className = "option-holder-selected";
      }
    }
  }
  
  public updateItems(view: string): void {
    let observable: any = undefined;
    let currentItems: any[] = [];
    switch(view) {
      case "boards":
        observable = this.boardMemberService.getBoardMembersByMember(this.currentUserID,{page: this.currentPage,pageSize: this.currentPageSize})
        currentItems = this.currentBoards;
        break;
      case "tasks":
        observable = this.taskAssignmentService.getTaskAssignmentsByUser(this.currentUserID,{page: this.currentPage,pageSize: this.currentPageSize});
        currentItems = this.currentTasks;
        break;
      case "invites":
        observable = this.boardInvitesService.getInvitesByUser(this.currentUserID,{page: this.currentPage,pageSize: this.currentPageSize});
        currentItems = this.currentBoardInvites;
        break;
      case "discussions":
        observable = this.discussionService.getDiscussionsByPublisher(this.currentUserID,{page: this.currentPage,pageSize: this.currentPageSize});
        currentItems = this.currentDiscussions;
        break;
      case "polls":
        observable = this.pollService.getPollsByPublisher(this.currentUserID,{page: this.currentPage,pageSize: this.currentPageSize});
        currentItems = this.currentPolls;
        break;
    }
    this.isSearching = true;
    observable.subscribe((value: PagedModel) => {
      this.isSearching = false;
      if(value._embedded != null) {
        if(value._embedded.content != null)
            currentItems = value._embedded.content;
        if(value._embedded.page != null) {
          this.currentPage = value._embedded.page.page;
          this.currentPageSize = value._embedded.page.size;
        }
      }
    },(err: any) => this.isSearching = false);
  }

  public resetPage(): void {
    this.currentPage = 0;
    this.currentPageSize = 20;
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

  public updateTemplate(event: any,requiredTemplate: any,path: string): void {
    let oldElement = this.currentSelectedElement;
    this.currentSelectedElement = event.target;
    this.currentSelectedElement.className = "option-holder-selected";
    if(oldElement != undefined)
        oldElement.className = "option-holder";
    this.resetPage();
    this.updateItems(path);
    this.currentTemplate = requiredTemplate;
    this.currentViewPath = path;
    this.updateRouter(path);
  }
}
