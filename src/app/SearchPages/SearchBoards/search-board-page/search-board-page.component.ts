import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/model/services/user.service';
import { Board, CollectionModel, Page, PagedModel } from 'src/model/interfaces';
import { Filter } from '../board-filter/board-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { BoardService } from 'src/model/services/board.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFilter, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-board-page',
  templateUrl: './search-board-page.component.html',
  styleUrls: ['./search-board-page.component.css']
})
export class SearchBoardPageComponent implements OnDestroy,AfterViewInit{

  private subscriptions: Subscription[] = [];
  public currentItems: Board[] = [];
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  public currentFilter: Filter | undefined = undefined;
  public isSearching: boolean = false;
  public boardIcon: IconDefinition = faTable;
  public filterIcon: IconDefinition = faFilter;
  @ViewChild("boardFilters") boardFilters: any;

  constructor(private offCanvasHandler: OffCanvasHandlerService,private boardService: BoardService) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandler.setContentTemplate(this.boardFilters);
  }


  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public openCanvas(): void {
    this.offCanvasHandler.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentPage.number = page - 1;
      this.currentFilter.page = this.currentPage.number;
      this.searchBoards();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchBoards();
  }

  public resetSearch(): void {
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchBoards();
  }

  public searchBoards(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.boardService.getBoardsBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.isSearching = false)
    }
  }
}
