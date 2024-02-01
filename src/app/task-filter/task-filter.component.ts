import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownOption } from '../dropdown/dropdown.component';

export interface Filter
{
   name?: String,
   description?: String,
   priority?: String,
   publisherEmail?: String,
   publisherName?: String,
   publisherSurname?: String,
   publisherUsername?: String,
   page: number,
   pageSize: number

}

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {

  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentPrioririties: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  public ngOnInit(): void {
    
  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.filterChanged.emit(this.currentFilter);
  }
}
