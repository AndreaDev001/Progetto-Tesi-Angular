import { Component, EventEmitter,Output, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/Utility/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';
import { UserService } from 'src/model/services/user.service';


export interface Filter
{
  title?: String,
  description?: String,
  publisherName?: String,
  publisherSurname?: String,
  publisherUsername?: String,
  publisherGender?: String,
  status?: String,
  page: number,
  pageSize: number
}
@Component({
  selector: 'app-poll-filter',
  templateUrl: './poll-filter.component.html',
  styleUrls: ['./poll-filter.component.css']
})
export class PollFilterComponent implements OnInit,OnDestroy {
  private subscriptions: Subscription[] = [];
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentGenders: DropdownOption[] = [];
  public currentStatues: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,private router: Router,private userService: UserService,private pollService: PollService) {

  }
  
  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      let title: string = value.title;
      let description: string = value.description;
      let publisherName: string = value.publisherName;
      let publisherSurname: string = value.publisherSurname;
      let publisherUsername: string = value.publisherUsername;
      let publisherGender: string = value.publisherGender;
      let status: string = value.status;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.pageSize != undefined ? value.pageSize : 20;
      this.currentFilter = {title: title,description: description,publisherName: publisherName,publisherSurname: publisherSurname,publisherUsername: publisherUsername,publisherGender: publisherGender,status: status,page: page,pageSize: pageSize};
      this.filterChanged.emit(this.currentFilter);
    }))
    this.userService.getGenders().subscribe((value: CollectionModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined)
      {
        value._embedded.content.forEach((current: string) => {
          let genderOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'publisherGender',current)};
          this.currentGenders.push(genderOption);
        })
      }
    })
    this.pollService.getStatues().subscribe((value: CollectionModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined) {
        value._embedded.content.forEach((current: string) => {
          let statusOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'status',current)};
          this.currentStatues.push(statusOption);
        })
      }
    })
  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.updateRouter()
    this.filterChanged.emit(this.currentFilter);
  }

  private updateRouter(): void {
    this.router.navigate(['search/polls'],{
      skipLocationChange: false,
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge',
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
