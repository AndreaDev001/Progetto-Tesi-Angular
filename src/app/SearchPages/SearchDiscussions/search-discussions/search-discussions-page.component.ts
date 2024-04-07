import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { Discussion, Page, PagedModel } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';
import { Filter } from '../discussion-filter/discussion-filter.component';

@Component({
  selector: 'app-search-discussions-page',
  templateUrl: './search-discussions-page.component.html',
  styleUrls: ['./search-discussions-page.component.css']
})
export class SearchDiscussionsPageComponent implements AfterViewInit,OnDestroy{

  private subscriptions: Subscription[] = [];
  public currentItems: Discussion[] = [];
  public currentFilter: Filter | undefined = undefined;
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
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
    this.offCanvasHandlerService.setTexts("Filters","Use the avaliable filters to find the desired discussions");
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentPage.number = page - 1;
      this.currentFilter.page = this.currentPage.number;
      this.searchDiscussions();
    }
  }

  public resetSearch(): void {
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
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
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.isSearching = false)
    }
  }

  public removeDiscussion(discussion: Discussion): void {
    this.currentItems = this.currentItems.filter((current: any) => current.id !== discussion.id);
  }
}
