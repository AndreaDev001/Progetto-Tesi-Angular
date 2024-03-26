 import { Component, OnDestroy, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Filter } from '../report-filter/report-filter.component';
import { Subscription } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { ReportService } from 'src/model/services/report.service';
import { PagedModel, Report } from 'src/model/interfaces';

@Component({
  selector: 'app-search-reports-page',
  templateUrl: './search-reports-page.component.html',
  styleUrls: ['./search-reports-page.component.css']
})
export class SearchReportsPageComponent implements AfterViewInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentItems: Report[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public currentFilter: Filter | undefined = undefined;
  public isSearching: boolean = false;
  public reportIcon: IconDefinition = faWarning;
  @ViewChild("reportFilters") reportFilters: any;

  constructor(private offCanvasHandlerService: OffCanvasHandlerService,private reportService: ReportService) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandlerService.setContentTemplate(this.reportFilters);
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
      this.searchReports();
    }
  }

  public resetSearch(): void {
    this.currentPage = 0;
    this.currentFilter = {page: 0,pageSize: 20}
    this.searchReports();
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchReports();
  }

  public searchReports(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.reportService.getReportsBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        if(value._embedded != undefined && value._embedded.content != undefined)
            this.currentItems = value._embedded.content;
        if(value.page != undefined) {
          this.currentPage = value.page.page;
          this.currentTotalPages = value.page.totalPages;
          this.currentTotalElements = value.page.totalElements;
        }
      },(err: any) => this.isSearching = false);
    }
  }
}
