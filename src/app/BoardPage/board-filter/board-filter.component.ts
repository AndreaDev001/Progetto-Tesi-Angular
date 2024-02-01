import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownOption } from 'src/app/dropdown/dropdown.component';

export interface Filter
{
  title?: String;
  description?: String;
  publisherEmail?: String;
  publisherUsername?: String;
  publisherName?: String;
  publisherSurname?: String;
  page: number,
  pageSize: number,
}
@Component({
  selector: 'app-board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.css']
})
export class BoardFilterComponent implements OnInit
{
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentGenders: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();
  
  public ngOnInit(): void {

  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.filterChanged.emit(this.currentFilter);
  }
}
