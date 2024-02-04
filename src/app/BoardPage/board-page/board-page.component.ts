import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownOption } from '../../Utility/dropdown/dropdown.component';
import { UserService } from 'src/model/services/user.service';
import { Board, CollectionModel, PagedModel } from 'src/model/interfaces';
import { Filter } from '../board-filter/board-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertHandlerService } from 'src/app/alert-handler.service';
import { OffCanvasHandlerService } from 'src/app/off-canvas-handler.service';
import { BoardService } from 'src/model/services/board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnDestroy,AfterViewInit{

  private subscriptions: Subscription[] = [];
  public currentItems: Board[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public currentFilter: Filter | undefined = undefined;
  public isSearching: boolean = false;
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
      this.currentFilter.page = page;
      this.searchBoards();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchBoards();
  }

  public searchBoards(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.boardService.getBoardsBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        if(value._embedded != null) {
          if(value._embedded.page != undefined) {
            this.currentPage = value._embedded.page.page;
            this.currentTotalPages = value._embedded.page.totalPages;
            this.currentTotalElements = value._embedded.page.totalElements;
          }
          if(value._embedded.content != undefined)
            this.currentItems = value._embedded.content;
        }
      })
    }
  }
}
