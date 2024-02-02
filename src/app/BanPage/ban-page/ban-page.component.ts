import { Component, OnInit } from '@angular/core';
import { Filter } from '../ban-filter/ban-filter.component';

@Component({
  selector: 'app-ban-page',
  templateUrl: './ban-page.component.html',
  styleUrls: ['./ban-page.component.css']
})
export class BanPageComponent implements OnInit {
  public ngOnInit(): void {
    
  }
  public handleFilterChange(filter: Filter) {
    
  }
}
