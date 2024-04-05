import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Page, PagedModel, PaginationRequest, TaskAssignment } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit,OnDestroy
{
  private subscriptions: Subscription[] = [];
  private currentUserID: any = undefined;
  public taskIcon: IconDefinition = faTasks;

  public isSearching: boolean = false;
  public currentTaskAssignments: TaskAssignment[] = [];
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};

  constructor(private taskAssignmentService: TaskAssignmentService,private authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subcribe((value: any) => {
      this.currentUserID = value;
      if(this.currentUserID != undefined)
          this.searchTaskAssignments(this.currentPage.number,this.currentPage.size);
    }))
  }

  private searchTaskAssignments(page: number,pageSize: number): void {
    this.isSearching = true;
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.taskAssignmentService.getTaskAssignmentsByUser(this.currentUserID,paginationRequest).subcribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentTaskAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.currentPage = value.page != undefined ? value.page : this.currentPage;
    },(err: any) => this.reset());
  }

  private reset(): void {
    this.isSearching = false;
    this.currentTaskAssignments = [];
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
