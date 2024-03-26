import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { PagedModel, PaginationRequest, TaskAssignment } from 'src/model/interfaces';
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
  private currentPage: number = 0;
  private currentTotalPages: number = 0;

  constructor(private taskAssignmentService: TaskAssignmentService,private authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subcribe((value: any) => {
      this.currentUserID = value;
      this.searchTaskAssignments(0,20);
    }))
  }

  private searchTaskAssignments(page: number,pageSize: number): void {
    this.isSearching = true;
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.taskAssignmentService.getTaskAssignmentsByUser(this.currentUserID,paginationRequest).subcribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentTaskAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
      }
    },(err: any) => this.reset());
  }

  private reset(): void {
    this.isSearching = false;
    this.currentTaskAssignments = [];
    this.currentPage = 0;
    this.currentTotalPages = 0;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
