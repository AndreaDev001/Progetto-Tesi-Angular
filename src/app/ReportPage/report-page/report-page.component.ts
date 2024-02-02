import { Component, OnInit } from '@angular/core';
import { Filter } from '../report-filter/report-filter.component';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {
  public ngOnInit(): void {
    
  }
  public handleFilterChange(filter: Filter): void {
    
  }
}
