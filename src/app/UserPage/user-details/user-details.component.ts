import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faMessage, faPoll, faTable, faTasks, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TextOverflowItem } from 'src/app/Utility/components/text-overflow/text-overflow.component';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { Board, BoardMember, Discussion, Page, PagedModel, PaginationRequest, Poll, PollVote, TaskAssignment, User } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { DiscussionService } from 'src/model/services/discussion.service';
import { PollService } from 'src/model/services/poll.service';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { ReportService } from 'src/model/services/report.service';

interface DescriptionItem
{
  icon: IconDefinition
  amount: number
  tooltip?: string
}
interface SearchRequest
{
  requiredItems: any[];
  requiredOverflowItems: TextOverflowItem[],
  requiredTemplate: any,
  requiredObservable: any,
  requiredService: any,
  requiredPage: Page,
  searching: boolean,
}
interface ContainerDescription
{
   name: string,
   icon: IconDefinition
   subtitle: string,
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
  public searchRequestsMap: Map<string,SearchRequest> = new Map();
  public containerDescriptionsMap: Map<string,ContainerDescription> = new Map();
  
  @ViewChild("createReportTemplate") createReportTemplate: any;
  @ViewChild("boardCardTemplate") boardCardTemplate: any;
  @ViewChild("discussionCardTemplate") discussionTemplate: any;
  @ViewChild("pollCardTemplate") pollTemplate: any;

  public currentUserID: string | undefined = undefined;
  public isAuthenticatedUser: boolean = false;
  public searchingReport: boolean = false;
  public hasReported: boolean = false;
  private subscriptions: Subscription[] = [];
  
  constructor(public alertHandlerService: AlertHandlerService,private reportService: ReportService,private authHandlerService: AuthHandlerService,private discussionService: DiscussionService,private pollService: PollService,private boardMemberService: BoardMemberService) {

  }

  public ngAfterViewInit(): void {
    if(this.user != undefined) 
        this.createSubscriptions();
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  private searchReport(): void {
    this.searchingReport = true;
    this.reportService.getReportBetween(this.authHandlerService.getCurrentUserID(true),this.user!!.id).subscribe((value: any) => {
      this.searchingReport = false;
      this.hasReported = value != undefined;
    },(err: any) => {
      this.searchingReport = false;
      this.hasReported = false;
    })
  }

  private createSubscriptions() {
    this.subscriptions.push(this.authHandlerService.getCurrentUserID(false).subscribe((value: any) => {
      if(value != undefined) {
        this.currentUserID = this.user!!.id;
        this.isAuthenticatedUser = this.currentUserID == value;
        this.searchReport();
        this.createDescriptions();
        this.createMapValues();
        this.updateItems('boards');
        this.updateItems('discussions');
        this.updateItems('polls');
      }
    }))
  }

  private createDescriptions(): void {
    this.descriptionItems = [];
    this.descriptionItems.push({amount: this.user!!.amountOfJoinedBoards,icon: faTable });
    this.descriptionItems.push({amount: this.user!!.amountOfAssignedTasks,icon: faTasks});
    this.descriptionItems.push({amount: this.user!!.amountOfCreatedDiscussions,icon: faMessage});
    this.descriptionItems.push({amount: this.user!!.amountOfCreatedPolls,icon: faPoll});
    this.descriptionItems.push({amount: this.user!!.amountOfCreatedVotes,icon: faCheck})
  }

  private createMapValues(): void {
    this.searchRequestsMap.set('boards',{requiredItems: [],requiredOverflowItems: [],requiredObservable: this.boardMemberService.getBoardMembersByMember,requiredService: this.boardMemberService,requiredPage: {number: 0,size: 20,totalElements: 0,totalPages: 0},searching: false,requiredTemplate: this.boardCardTemplate});
    this.searchRequestsMap.set('discussions',{requiredItems: [],requiredOverflowItems: [],requiredObservable: this.discussionService.getDiscussionsByPublisher,requiredService: this.discussionService,requiredPage: {number: 0,size: 5,totalElements: 0,totalPages: 0},searching: false,requiredTemplate: this.discussionTemplate});
    this.searchRequestsMap.set('polls',{requiredItems: [],requiredOverflowItems: [],requiredObservable: this.pollService.getPollsByPublisher,requiredService: this.pollService,requiredPage: {number: 0,size: 20,totalElements: 0,totalPages: 0},searching: false,requiredTemplate: this.pollTemplate});

    this.containerDescriptionsMap.set('boards',{name: 'Boards',subtitle: 'View all of the board this user partecipates in',icon: faTable});
    this.containerDescriptionsMap.set('discussions',{name: 'Discussions',subtitle: 'View all of the discussions this user has published',icon: faMessage});
    this.containerDescriptionsMap.set('polls',{name: 'Polls',subtitle: 'View all the polls this user has published',icon: faPoll});
  }

  public updateItems(key: string): void {
    let searchRequest: SearchRequest | undefined = this.searchRequestsMap.get(key);
    if(searchRequest != undefined) {
        let paginationRequest: PaginationRequest = {page: searchRequest.requiredPage.number,pageSize: searchRequest.requiredPage.size};
        searchRequest.searching = true;
        searchRequest.requiredObservable(this.currentUserID,paginationRequest,searchRequest.requiredService).subscribe((value: PagedModel) => {
          searchRequest!!.searching = false;
          if(value._embedded && value._embedded.content != undefined) {
            searchRequest!!.requiredItems = value._embedded.content;
            value._embedded.content.forEach((current: any) => {
              searchRequest!!.requiredOverflowItems.push({template: searchRequest!!.requiredTemplate,context: current})
          });
          }
          else
          {
            searchRequest!!.requiredItems = [];
            searchRequest!!.requiredOverflowItems = [];
          }
          searchRequest!!.requiredPage = value.page != undefined ? value.page : searchRequest!!.requiredPage;
        },(err: any) => {
          this.reset(key);
        })
    }
  }

  public reset(key: string,update: boolean = false): void {
    if(this.searchRequestsMap.has(key)) {
      let searchRequest: SearchRequest | undefined = this.searchRequestsMap.get(key);
      searchRequest!!.searching = false;
      searchRequest!!.requiredItems = [];
      searchRequest!!.requiredOverflowItems = [];
      searchRequest!!.requiredPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
      if(update)
          this.updateItems(key);
    }
  }

  public updateCurrentPage(key: string): void {
    if(this.searchRequestsMap.has(key)) {
      let searchRequest: SearchRequest | undefined = this.searchRequestsMap.get(key);
      console.log(searchRequest);
      if(searchRequest!!.requiredPage.number + 1 < searchRequest!!.requiredPage.totalPages) {
        searchRequest!!.requiredPage.number = searchRequest!!.requiredPage .number + 1;
        this.updateItems(key);
      }
    }
  }

  public createReport(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createReportTemplate);
    this.alertHandlerService.open();
  }
}
