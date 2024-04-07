import { Component, OnDestroy,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page, PagedModel, Task, TaskAssignment } from 'src/model/interfaces';
import { Filter } from '../task-filter/task-filter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTasks } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { TaskService } from 'src/model/services/task.service';

@Component({
  selector: 'app-search-tasks-page',
  templateUrl: './search-tasks-page.component.html',
  styleUrls: ['./search-tasks-page.component.css']
})
export class SearchTasksPageComponent implements AfterViewInit,OnDestroy{
  
  private subscriptions: Subscription[] = [];
  public currentItems: Task[] = [];
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  public currentFilter: Filter | undefined = undefined;
  public taskIcon: IconDefinition = faTasks;
  public fitlerIcon: IconDefinition = faFilter;
  public isSearching: boolean = false;
  @ViewChild("taskFilters") taskFilters: any;

  constructor(private offCanvasHandler: OffCanvasHandlerService,private taskService: TaskService) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandler.setContentTemplate(this.taskFilters);
  }

  public openCanvas(): void {
    this.offCanvasHandler.setTitle("Filters");
    this.offCanvasHandler.setSubtitle("Use the filters to find the desired tasks");
    this.offCanvasHandler.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentPage.number = page - 1;
      this.currentFilter.page = this.currentPage.number;
      this.searchTasks();
    }
  }

  public handleFilterChange(filter: Filter) {
    this.currentFilter = filter;
    this.searchTasks();
  }

  
  public resetSearch(): void {
    this.currentPage = {number: 0,size: 20,totalPages: 0,totalElements: 0};
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchTasks();
  }

  public searchTasks(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.taskService.getTasksBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.isSearching = false);
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
