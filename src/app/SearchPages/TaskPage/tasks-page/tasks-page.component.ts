import { Component, OnDestroy,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagedModel, Task, TaskAssignment } from 'src/model/interfaces';
import { Filter } from '../task-filter/task-filter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTasks } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/services/off-canvas-handler.service';
import { TaskService } from 'src/model/services/task.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements AfterViewInit,OnDestroy{
  
  private subscriptions: Subscription[] = [];
  public currentItems: Task[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
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
      this.currentPage = page;
      this.searchTasks();
    }
  }

  public handleFilterChange(filter: Filter) {
    this.currentFilter = filter;
    this.searchTasks();
  }

  
  public resetSearch(): void {
    this.currentPage = 0;
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchTasks();
  }

  public searchTasks(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.taskService.getTasksBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        if(value._embedded != undefined && value._embedded.content != undefined)
            this.currentItems = value._embedded.content;
        if(value.page != undefined) {
          this.currentPage = value.page.page;
          this.currentTotalPages = value.page.totalPages;
          this.currentTotalElements = value.page.totalElements;
        }
      })
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
