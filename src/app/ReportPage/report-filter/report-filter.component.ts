import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DropdownOption } from '../../Utility/dropdown/dropdown.component';
import { UserService } from 'src/model/services/user.service';
import { ReportService } from 'src/model/services/report.service';
import { CollectionModel } from 'src/model/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
   type?: String,
   page: number,
   pageSize: number
}
@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.css']
})
export class ReportFilterComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentGenders: DropdownOption[] = [];
  public currentReasons: DropdownOption[] = [];
  public currentTypes: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  constructor(private reportService: ReportService,private router: Router,private activatedRoute: ActivatedRoute) {
    
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      let title: string = value.title;
      let description: string = value.description;
      let reporterName: string = value.reporterName;
      let reportedName: string = value.reportedName;
      let reporterSurname: string = value.reporterSurname;
      let reportedSurname: string = value.reportedSUrname;
      let reporterUsername: string = value.reporterUsername;
      let reportedUsername: string = value.reportedUsername;
      let type: string = value.type;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.pageSize != undefined ? value.pageSize : 20;
      this.currentFilter = {title: title,description: description,reporterName: reporterName,reportedName: reportedName,reportedSurname: reportedSurname,type: type,page: page,pageSize: pageSize,reporterSurname: reporterSurname,reporterUsername: reporterUsername,reportedUsername: reportedUsername}
      this.filterChanged.emit(this.currentFilter);
    }));
    this.reportService.getReasons().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let reasonOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'reason',current)}
          this.currentReasons.push(reasonOption);
        })
      }
    })  
    this.reportService.getTypes().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let typeOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'type',current)}
          this.currentTypes.push(typeOption);
        })
      }
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.updateRouter()
    this.filterChanged.emit(this.currentFilter);
  }
  private updateRouter(): void {
    this.router.navigate(['search/reports'],{
      skipLocationChange: false,
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge',
    })
  }
}
