import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../ban-filter/ban-filter.component';
import { Subscription } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBan, faFilter } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { BanService } from 'src/model/services/ban.service';
import { Ban, Page, PagedModel } from 'src/model/interfaces';

@Component({
  selector: 'app-search-ban-page',
  templateUrl: './search-ban-page.component.html',
  styleUrls: ['./search-ban-page.component.css']
})
export class SearchBanPageComponent implements AfterViewInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentItems: Ban[] = [];
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
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
    this.offCanvasHandlerService.setTexts("Filters","Use the avaliable filters to find the desired bans");
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentPage.number = page - 1;
      this.currentFilter.page = this.currentPage.number;
      this.searchBans();
    }
  }

  public resetSearch(): void {
    if(this.currentFilter != undefined) {
      this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
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
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.isSearching = false);
    }
  }

  public deleteBan(ban: Ban): void {
    this.currentItems = this.currentItems.filter((current: any) => current.id !== ban.id);
  }
}
