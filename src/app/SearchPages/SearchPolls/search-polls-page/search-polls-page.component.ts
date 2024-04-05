import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Page, PagedModel, Poll } from 'src/model/interfaces';
import { Filter } from '../poll-filter/poll-filter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-search-polls-page',
  templateUrl: './search-polls-page.component.html',
  styleUrls: ['./search-polls-page.component.css']
})
export class SearchPollsPageComponent implements AfterViewInit,OnDestroy {
  private subscriptions: Subscription[] = [];
  public currentItems: Poll[] = [];
  public currentPage: Page = {number: 0,size: 0,totalElements: 0,totalPages: 0};
  public currentFilter: Filter | undefined  = undefined;
  public isSearching: boolean = false;
  public pollIcon: IconDefinition = faPoll;
  @ViewChild("pollFilters") pollFilters: any;

  constructor(private offCanvasHandlerService: OffCanvasHandlerService,private pollService: PollService) {
    
  }

  public ngAfterViewInit(): void {
    this.offCanvasHandlerService.setContentTemplate(this.pollFilters);  
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public openCanvas(): void {
    this.offCanvasHandlerService.setTexts("Filters","Use the avaliable filters to find the desired polls");
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentPage.number = page - 1;
      this.currentFilter.page = this.currentPage.number;
      this.searchPolls();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchPolls();
  }
  public resetSearch(): void {
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchPolls();
  }

  public searchPolls(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.pollService.getPollsBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.isSearching = false);
    }
  }
}
