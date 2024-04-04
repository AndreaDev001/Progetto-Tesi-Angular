import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../ban-filter/ban-filter.component';
import { Subscription } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBan, faFilter } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { BanService } from 'src/model/services/ban.service';
import { Ban, PagedModel } from 'src/model/interfaces';

@Component({
  selector: 'app-search-ban-page',
  templateUrl: './search-ban-page.component.html',
  styleUrls: ['./search-ban-page.component.css']
})
export class SearchBanPageComponent implements AfterViewInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentItems: Ban[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public currentFilter: Filter | undefined = undefined;
  public isSearching: boolean = false;

  public banIcon: IconDefinition = faBan;
  public filterIcon: IconDefinition = faFilter;

  @ViewChild("banFilters") banFilters: any;

  constructor(private offCanvasHandlerService: OffCanvasHandlerService,private banService: BanService) {

  }


  public ngAfterViewInit(): void {
    this.offCanvasHandlerService.setCurrentOffCanvas(this.banFilters);
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
      this.searchBans();
    }
  }

  public resetSearch(): void {
    if(this.currentFilter != undefined) {
      this.currentPage = 0;
      this.currentFilter = {page: 0,pageSize: 20};
      this.searchBans();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchBans();
  }
 
  public searchBans(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.banService.getBansBySpec(this.currentFilter).subscribe((value: PagedModel) => {
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

  public deleteBan(ban: Ban): void {
    this.currentItems = this.currentItems.filter((current: any) => current.id !== ban.id);
  }
}
