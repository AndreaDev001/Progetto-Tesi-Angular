import { Component, OnInit,Input, EventEmitter,Output, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAnglesLeft, faAnglesRight, faArrowLeft, faArrowRight, faChevronLeft, faChevronRight, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges,AfterViewInit {

  @ViewChild("defaultPageTemplate") defaultPageTemplate: any;
  @ViewChild("defaultPreviousPageTemplate") defaultPreviousPageTemplate: any;
  @ViewChild("defaultNextPageTemplate") defaultNextPageTemplate: any;
  @ViewChild("defaultFirstPageTemplate") defaultFirstPageTemplate: any;
  @ViewChild("defaultLastPageTemplate") defaultLastPageTemplate: any;

  @Input() defaultPage: number = 1;
  @Input() pageSize: number = 20;
  @Input() totalElements: number = 100;
  @Input() clickCallback: () => void = () => {};
  @Input() pageTemplate: any = undefined;
  @Input() previousPageTemplate: any = undefined;
  @Input() nextPageTemplate: any = undefined;
  @Input() firstPageTemplate: any = undefined;
  @Input() lastPageTemplate: any = undefined;
  @Output() pageChanged: EventEmitter<Number> = new EventEmitter<Number>();

  public currentAmountOfPages: number = this.totalElements / this.pageSize;
  public previousPageIcon: IconDefinition = faChevronLeft;
  public nextPageIcon: IconDefinition = faChevronRight;
  public firstPageIcon: IconDefinition = faAnglesLeft;
  public lastPageIcon: IconDefinition = faAnglesRight;

  public ngAfterViewInit(): void {
    this.currentAmountOfPages = this.totalElements / this.pageSize;
    this.pageTemplate = this.pageTemplate != undefined ? this.pageTemplate : this.defaultPageTemplate;
    this.previousPageTemplate = this.previousPageTemplate != undefined ? this.previousPageTemplate : this.defaultPreviousPageTemplate;
    this.nextPageTemplate = this.nextPageTemplate != undefined ? this.nextPageTemplate : this.defaultNextPageTemplate; 
    this.firstPageTemplate = this.firstPageTemplate != undefined ? this.firstPageTemplate : this.defaultFirstPageTemplate;
    this.lastPageTemplate = this.lastPageTemplate != undefined ? this.lastPageTemplate : this.defaultLastPageTemplate;
  }


    public ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalElements'] != null || changes['pageSize'] != null)
        this.currentAmountOfPages = this.totalElements / this.pageSize;
    if(changes['pageTemplate'] != undefined)
      this.pageTemplate = this.pageTemplate != undefined ? this.pageTemplate : this.defaultPageTemplate;
    if(changes['previousPageTemplate'] != undefined)
        this.previousPageTemplate = this.previousPageTemplate != undefined ? this.previousPageTemplate : this.defaultPreviousPageTemplate;
    if(changes['nextPageTemplate'] != undefined)
        this.nextPageTemplate = this.nextPageTemplate != undefined ? this.nextPageTemplate : this.defaultNextPageTemplate;
    if(changes['firstPageTemplate'] != undefined)
        this.firstPageTemplate = this.firstPageTemplate != undefined ? this.firstPageTemplate : this.defaultFirstPageTemplate;
    if(changes['lastPageTemplate'] != undefined)
        this.lastPageTemplate = this.lastPageTemplate != undefined ? this.lastPageTemplate: this.defaultLastPageTemplate;
  }

  public handleClick(index: number): void {
    this.clickCallback();
    this.pageChanged.emit(index);
  }
  public createRange(number: any){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
