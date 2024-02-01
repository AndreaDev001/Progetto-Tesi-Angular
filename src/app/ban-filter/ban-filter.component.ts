import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownOption } from '../dropdown/dropdown.component';

export interface Filter
{
   title?: String,
   description?: String,
   type?: String,
   reason?: String,
   bannerName?: String,
   bannedName?: String,
   bannerSurname?: String,
   bannedSurname?: String,
   bannerUsername?: String,
   bannedUsername?: String,
   page: 0,
   pageSize: 20
}
@Component({
  selector: 'app-ban-filter',
  templateUrl: './ban-filter.component.html',
  styleUrls: ['./ban-filter.component.css']
})
export class BanFilterComponent implements OnInit
{
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentReasons: DropdownOption[] = [];
  public currentTypes: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();


  public ngOnInit(): void {
    
  } 

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.filterChanged.emit(this.currentFilter);
  }
}
