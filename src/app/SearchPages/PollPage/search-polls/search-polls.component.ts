import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagedModel, Poll } from 'src/model/interfaces';
import { Filter } from '../poll-filter/poll-filter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/services/off-canvas-handler.service';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-search-polls',
  templateUrl: './search-polls.component.html',
  styleUrls: ['./search-polls.component.css']
})
export class SearchPollsComponent implements AfterViewInit,OnDestroy {
  private subscriptions: Subscription[] = [];
  public currentItems: Poll[] = [];
  public currentFilter: Filter | undefined  = undefined;
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
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
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentFilter.page = page;
      this.searchPolls();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchPolls();
  }
  public resetSearch(): void {
    this.currentPage = 0;
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchPolls();
  }

  public searchPolls(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.pollService.getPollsBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        if(value.page != undefined) {
          this.currentPage = value.page.page;
          this.currentTotalPages = value.page.totalPages;
          this.currentTotalElements = value.page.totalElements;
        }
      })
    }
  }
}
