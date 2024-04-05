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

  @Input() defaultPage: number = 1;
  @Input() pageSize: number = 20;
  @Input() totalElements: number = 100;
  @Input() clickCallback: () => void = () => {};
  @Input() pageTemplate: any = undefined;
  @Output() pageChanged: EventEmitter<Number> = new EventEmitter<Number>();

  public currentAmountOfPages: number = Math.ceil(this.totalElements / this.pageSize);
  public previousPageIcon: IconDefinition = faChevronLeft;
  public nextPageIcon: IconDefinition = faChevronRight;
  public firstPageIcon: IconDefinition = faAnglesLeft;
  public lastPageIcon: IconDefinition = faAnglesRight;

  public ngAfterViewInit(): void {
    this.currentAmountOfPages = this.totalElements / this.pageSize;
    this.assignTemplates();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalElements'] != null || changes['pageSize'] != null)
        this.currentAmountOfPages = Math.ceil(this.totalElements / this.pageSize);
    if(changes['pageTemplate'] != undefined)
      this.pageTemplate = this.pageTemplate != undefined ? this.pageTemplate : this.defaultPageTemplate;
  }

  private assignTemplates(): void {
    this.pageTemplate = this.pageTemplate != undefined ? this.pageTemplate : this.defaultPageTemplate;

  }

  public handleClick(index: number): void {
    this.clickCallback();
    this.pageChanged.emit(index);
  }
  public createRange(number: any){
    number = Math.ceil(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }
}
