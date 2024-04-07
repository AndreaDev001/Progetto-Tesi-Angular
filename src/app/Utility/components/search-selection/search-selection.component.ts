import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedModel, PaginationRequest } from 'src/model/interfaces';
import { TextOverflowItem } from '../text-overflow/text-overflow.component';

@Component({
  selector: 'app-search-selection',
  templateUrl: './search-selection.component.html',
  styleUrls: ['./search-selection.component.css']
})
export class SearchSelectionComponent implements AfterViewInit,OnDestroy {

  @Input() requiredTemplate: any = undefined;
  @Input() requiredObservable: any = undefined;
  @Input() requiredContext: any = undefined;
  @Input() placeholder: any = undefined;
  @Input() label: any = undefined;
  @Input() supportingText: any = undefined;
  @Input() boardID: any = undefined;
  public currentElements: any[] = [];
  public currentOverflowItems: any[] = [];
  public currentText: any = undefined;
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public isSearching: boolean = false;
  public currentSelectedElement: any = undefined;
  @ViewChild("elementTemplate") elementTemplate: any = undefined;
  @Output() textChanged: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  public ngAfterViewInit(): void {
    this.searchValues(false);
  }

  public searchValues(page: boolean): void {
    if(this.currentText != undefined) 
    {
      let paginationRequest: PaginationRequest = {page: this.currentPage,pageSize: 20};
      let observable: any = this.boardID != undefined ? this.requiredObservable(this.requiredContext,this.currentText,this.boardID,paginationRequest) : this.requiredObservable(this.requiredContext,this.currentText,paginationRequest);
      this.isSearching = !page;
      observable.subscribe((value: any) => {
        this.isSearching = false;
        if(value._embedded != undefined && value._embedded.content != undefined) {
          if(page) {
            this.currentElements.push(value._embedded.content);
          }
          else 
          {
            this.currentElements = value._embedded.content;
            this.currentOverflowItems = [];
          }
          this.currentElements.forEach((current: any) => {
            let overflowItem:TextOverflowItem = {template: this.elementTemplate,context: current};
            this.currentOverflowItems.push(overflowItem);
          })
        }
        else if(!page)
            this.reset();
        if(value.page != undefined) {
          this.currentPage = value.page.number;
          this.currentTotalPages = value.page.totalPages;
        }
      },(err: any) => {
        this.reset()
      });
    }
  }

  private reset(): void {
    this.isSearching = false;
    this.currentElements = [];
    this.currentOverflowItems = [];
    this.currentPage = 0;
    this.currentTotalPages = 0;
  }

  public handleChange(event: any): void {
    this.currentText = event;
    this.searchValues(false);
  }

  public updateMaxPage(): void {
    if(this.currentPage + 1 <= this.currentTotalPages) {
      this.currentPage++;
      this.searchValues(true);
    }
  }

  public confirmSelection(): void {
    this.confirmEvent.emit(this.currentSelectedElement);
  }

  public cancelSelection(): void {
    this.cancelEvent.emit();
  }

  public ngOnDestroy(): void {

  }
}
