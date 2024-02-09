import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DropdownOption } from '../../Utility/dropdown/dropdown.component';
import { BanService } from 'src/model/services/ban.service';
import { CollectionModel } from 'src/model/interfaces';
import { ReportService } from 'src/model/services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
   page: number,
   pageSize: number
}
@Component({
  selector: 'app-ban-filter',
  templateUrl: './ban-filter.component.html',
  styleUrls: ['./ban-filter.component.css']
})
export class BanFilterComponent implements OnInit,OnDestroy
{
  private subscriptions: Subscription[] = [];
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentReasons: DropdownOption[] = [];
  public currentTypes: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  constructor(private banService: BanService,private reportService: ReportService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.queryParams.subscribe((value: any) => {
      let title: string = value.title;
      let description: string = value.description;
      let type: string = value.type;
      let reason: string = value.reason;
      let bannerName: string = value.bannerName;
      let bannedName: string = value.bannedName;
      let bannerSurname: string = value.bannerSurname;
      let bannedSurname: string = value.bannedSurname;
      let bannerUsername: string = value.bannerUsername;
      let bannedUsername: string = value.bannedUsername;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.pageSize != undefined ? value.pageSize : 20;
      this.currentFilter = {title: title,description: description,type: type,reason: reason,bannerName: bannerName,bannedName: bannedName,bannerSurname: bannerSurname,bannedSurname: bannedSurname, bannerUsername: bannerUsername,bannedUsername: bannedUsername,page: page,pageSize: pageSize};
      this.filterChanged.emit(this.currentFilter);
    }));
    this.banService.getTypes().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let banOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'type',current)};
          this.currentTypes.push(banOption);
        })
      }
    });
    this.reportService.getReasons().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let reasonOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'reason',current)};
          this.currentReasons.push(reasonOption);
        })
      }
    })
  } 

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.updateRouter();
    this.filterChanged.emit(this.currentFilter);
  }
  private updateRouter(): void {
    this.router.navigate(['search/bans'],{
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge',
      skipLocationChange: false
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
