import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

export interface TextOverflowItem
{
  context: any;
  template: TemplateRef<any>;
}
@Component({
  selector: 'app-text-overflow',
  templateUrl: './text-overflow.component.html',
  styleUrls: ['./text-overflow.component.css']
})
export class TextOverflowComponent implements AfterViewInit {

  @Input() horizontal: boolean = true;
  @Output() scrollEndReached: EventEmitter<any> = new EventEmitter();
  @Output() scrollStartReached: EventEmitter<any> = new EventEmitter();
  @Input() templates: TextOverflowItem[] = [];
  
  @ViewChild("horizontalTemplate") horizontalTemplate: any;
  @ViewChild("verticalTemplate") verticalTemplate: any;
  public currentTemplate: TemplateRef<any> | undefined = undefined;


  public ngAfterViewInit(): void {
    this.currentTemplate = this.horizontal ? this.horizontalTemplate : this.verticalTemplate;
  }
  public handleHorizontalScroll(event: any): void {
    if(event.target.offsetWidth + event.target.scrollLeft >= event.target.scrollWidth)
      this.scrollEndReached.emit();
    if(event.target.scrollLeft == 0)
      this.scrollStartReached.emit();
  }

  public handleVerticalScroll(event: any): void {
    if(event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight)
      this.scrollEndReached.emit();
    if(event.target.scrollLeft == 0)
      this.scrollStartReached.emit();
  }
}
