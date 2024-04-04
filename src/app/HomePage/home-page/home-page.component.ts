import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { faHandsWash, faHandshake, faMessage, faPoll, faTable, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { Board, BoardInvite, BoardMember, Discussion, Page, PagedModel, PaginationRequest, Poll, Task, TaskAssignment } from 'src/model/interfaces';
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
}
interface DescriptionItem
{
  name: string,
  icon: IconDefinition,
  subtitle: string
}
interface ViewItem
{
   requiredPath: string,
   requiredIndex: number,
   requiredTemplate: any,
   requiredObservable: any;
}
interface ViewItemDescription
{
  requiredTitle: string,
  requiredIcon: IconDefinition,
  requiredSubtitle: string
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild("boardTemplate") boardTemplate: any;
  @ViewChild("boardInviteTemplate") boardInviteTemplate: any;
  @ViewChild("taskTemplate") taskTemplate: any;
  @ViewChild("discussionTemplate") discussionTemplate: any;
  @ViewChild("pollTemplate") pollTemplate: any;


  private subscriptions: Subscription[] = [];

  public currentTemplate: TemplateRef<any> | undefined = undefined;
  public currentViewPath: string = "boards";


  public currentItems: any[] = [];
  public isSearching: boolean = false;
  public currentPage: Page = {page: 0,size: 20,totalPages: 0,totalElements: 0}
  public currentSelectedIndex: number = 0;

  public optionsTemplate: OptionTemplate[] = [];
  public welcomeBackIcon: IconDefinition = faHandshake;

  public boardIcon: IconDefinition = faTable;
  public taskIcon: IconDefinition = faTasks;
  public discussionIcon: IconDefinition = faDiscourse;
  public invitesIcon: IconDefinition = faMessage;
  public pollIcon: IconDefinition = faPoll;

  public currentObservable: any = undefined;
  public currentUserID: any = undefined;
  private viewItemsMap : Map<string,ViewItem> = new Map();

  public descriptionItems: DescriptionItem[] = [];
  public viewDescriptions: ViewItemDescription[] = [];

  constructor(private authHandler: AuthHandlerService,private boardInvitesService: BoardInviteService,private boardMemberService: BoardMemberService,private taskAssignmentService: TaskAssignmentService,private discussionService: DiscussionService,private pollService: PollService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngAfterViewInit(): void 
  {
    this.createSubscriptions();
    this.createDescriptions();
    this.createOptions();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  private createViewDescriptions(): void {
    this.viewDescriptions.push({requiredTitle: 'Boards',requiredIcon: faTable,requiredSubtitle: 'View all the boards you are a member of'});
    this.viewDescriptions.push({requiredTitle: 'Tasks',requiredIcon: faTasks,requiredSubtitle: 'View all the tasks you have been assigned to'});
    this.viewDescriptions.push({requiredTitle: 'Invites',requiredIcon: faMessage,requiredSubtitle: 'View all of the invites you have received'});
    this.viewDescriptions.push({requiredTitle: 'Discussions',requiredIcon: faDiscourse,requiredSubtitle: 'View all of the discussions you have published'});
    this.viewDescriptions.push({requiredTitle: 'Polls',requiredIcon: faPoll,requiredSubtitle: 'View all of the polls you have published'});
  }

  private createMapValues(): void {
    let paginationRequest: PaginationRequest = {page: 0,pageSize: 20};
    this.viewItemsMap.set('boards',{requiredPath: 'boards',requiredIndex: 0,requiredTemplate: this.boardTemplate,requiredObservable: this.boardMemberService.getBoardMembersByMember(this.currentUserID,paginationRequest)});
    this.viewItemsMap.set('tasks',{requiredPath: 'tasks',requiredIndex: 1,requiredTemplate: this.taskTemplate,requiredObservable: this.taskAssignmentService.getTaskAssignmentsByUser(this.currentUserID,paginationRequest)});
    this.viewItemsMap.set('invites',{requiredPath: 'invites',requiredIndex: 2,requiredTemplate: this.boardInviteTemplate,requiredObservable: this.boardInvitesService.getInvitesByUser(this.currentUserID,paginationRequest)});
    this.viewItemsMap.set('discussions',{requiredPath: 'discussions',requiredIndex: 3,requiredTemplate: this.discussionTemplate,requiredObservable: this.discussionService.getDiscussionsByPublisher(this.currentUserID,paginationRequest)});
    this.viewItemsMap.set('polls',{requiredPath: 'polls',requiredIndex: 4,requiredTemplate: this.pollTemplate,requiredObservable: this.pollService.getPollsByPublisher(this.currentUserID,paginationRequest)});
  }

  private createSubscriptions(): void {
    this.subscriptions.push(this.activatedRoute.queryParams.subscribe((value: any) => {
      let view: string = value.view;
      if(view == null) 
      {
        this.currentTemplate = this.boardTemplate;
        this.currentViewPath = "boards";
        this.updateRouter(this.currentViewPath);
      }
      else
      {
        this.currentViewPath = view;
        this.updateItems(this.currentViewPath);
      }
    }))
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
      if(this.currentUserID == undefined && value != undefined) {
        this.currentUserID = value;
        this.createMapValues();
        this.createViewDescriptions();
        if(this.currentViewPath != undefined)
            this.updateItems(this.currentViewPath);
      }
    }));
  }

  private createDescriptions(): void {
    this.descriptionItems.push({name: "Boards",subtitle: "Here you can see all of the boards you partecipate in",icon: this.boardIcon})
    this.descriptionItems.push({name: "Tasks",subtitle: "Here you can see all of the tasks that have been assigned to you",icon: this.taskIcon})
    this.descriptionItems.push({name: "Discussions",subtitle: "Here you can see all of the discussions that have been assingned to you",icon: this.discussionIcon})
    this.descriptionItems.push({name: "Invites",subtitle: "Here you can see all of the invites that you have received",icon: this.invitesIcon})
    this.descriptionItems.push({name: "Polls",subtitle: "Here you can see all of the polls that you have created",icon: this.pollIcon});
  }

  private createOptions(): void {
    this.optionsTemplate.push({name: "Boards",icon: faTable,path: "boards"});
    this.optionsTemplate.push({name: "Tasks",icon: faTasks,path: "tasks"});
    this.optionsTemplate.push({name: "Invites",icon: faMessage,path: "invites"});
    this.optionsTemplate.push({name: "Discussions",icon: faDiscourse,path: "discussions"});
    this.optionsTemplate.push({name: "Polls",icon: faPoll,path: "polls"});
  }

  public searchItems(): void {
    if(this.currentObservable != undefined) {
      this.isSearching = true;
      this.currentObservable.subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => {
        this.currentItems = [];
        this.isSearching = false;
      });
    }
  }

  public resetPage(): void {
    this.currentPage = {page: 0,size: 20,totalPages: 0,totalElements: 0};
    this.updateItems(this.currentViewPath);
  }

  public handlePageChange(event: any): void {
    this.currentPage = event;
    this.updateItems(this.currentViewPath);
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
    if(!this.viewItemsMap.has(view))
        return;
    let viewItem: ViewItem | undefined = this.viewItemsMap.get(view);
    this.currentSelectedIndex = viewItem!!.requiredIndex;
    this.currentTemplate = viewItem!!.requiredTemplate;
    this.currentObservable = viewItem!!.requiredObservable;
    this.searchItems();
  }

  public updateTemplate(path: string): void {
    this.resetPage();
    this.currentViewPath = path;
    this.updateRouter(path);
  }
}
