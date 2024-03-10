import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { OffCanvasHandlerService } from 'src/app/services/off-canvas-handler.service';
import { Discussion, PagedModel } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';
import { Filter } from '../discussion-filter/discussion-filter.component';

@Component({
  selector: 'app-search-discussions',
  templateUrl: './search-discussions.component.html',
  styleUrls: ['./search-discussions.component.css']
})
export class SearchDiscussionsComponent implements AfterViewInit,OnDestroy{
  private subscriptions: Subscription[] = [];
  public currentItems: Discussion[] = [];
  public currentFilter: Filter | undefined = undefined;
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public isSearching: boolean = false;
  public discussionIcon: IconDefinition = faDiscourse;
  @ViewChild("discussionFilters") discussionFilters: any;

  constructor(private offCanvasHandlerService: OffCanvasHandlerService,private discussionService: DiscussionService) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandlerService.setContentTemplate(this.discussionFilters);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public openCanvas(): void {
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentFilter.page = page;
      this.searchDiscussions();
    }
  }

  public resetSearch(): void {
    this.currentPage = 0;
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchDiscussions();
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchDiscussions();
  }

  public searchDiscussions(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.discussionService.getDiscussionsBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        if(value.page != undefined) {
          this.currentPage = value.page.page;
          this.currentTotalPages = value.page.totalPages;
          this.currentTotalElements = value.page.totalElements;
        }
      },(err: any) => this.isSearching = false)
    }
  }
}
