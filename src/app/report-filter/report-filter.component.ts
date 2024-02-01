import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownOption } from '../dropdown/dropdown.component';

export interface Filter
{
   title?: String,
   description?: String,
   reporterName?: String,
   reportedName?: String,
   reason?: String,
   reporterSurname?: String,
   reportedSurname?: String,
   reporterUsername?: String,
   reportedUsername?: String,
   reporterGender?: String,
   reportedGender?: String,
   page: number,
   pageSize: number
}
@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.css']
})
export class ReportFilterComponent implements OnInit {

  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentGenders: DropdownOption[] = [];
  public currentReasons: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  public ngOnInit(): void {
    
  }
  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.filterChanged.emit(this.currentFilter);
  }
}
