import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/Utility/components/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { UserService } from 'src/model/services/user.service';

export interface Filter
{
  title?: String,
  topic?: String,
  publisherName?: String,
  publisherSurname?: String,
  publisherUsername?: String,
  publisherGender?: String,
  page: number,
  pageSize: number
}
@Component({
  selector: 'app-discussion-filter',
  templateUrl: './discussion-filter.component.html',
  styleUrls: ['./discussion-filter.component.css']
})
export class DiscussionFilterComponent implements OnInit,OnDestroy {
  private subscriptions: Subscription[] = [];
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentGenders: DropdownOption[] = [];
  @Input() rowDisplay: boolean = false;
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  constructor(private userService: UserService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.createSubscriptions();
    this.searchGenders();
  }

  private createSubscriptions(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      let title: string = value.title;
      let topic: string = value.topic;
      let publisherName: string = value.publisherName;
      let publisherSurname: string = value.publisherSurname;
      let publisherUsername: string = value.publisherUsername;
      let publisherGender: string = value.publisherGender;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.page != undefined ? value.pageSize: 20;
      this.currentFilter = {title: title,topic: topic,publisherName: publisherName,publisherSurname: publisherSurname,publisherUsername: publisherUsername,publisherGender: publisherGender,page: page,pageSize: pageSize}
      this.filterChanged.emit(this.currentFilter);
    }))
  }

  private searchGenders(): void {
    this.userService.getGenders().subscribe((value: CollectionModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined)
      {
        value._embedded.content.forEach((current: string) => {
          let genderOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'publisherGender',current)};
          this.currentGenders.push(genderOption);
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
    this.router.navigate(['search/discussions'],{
      skipLocationChange: false,
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge',
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
