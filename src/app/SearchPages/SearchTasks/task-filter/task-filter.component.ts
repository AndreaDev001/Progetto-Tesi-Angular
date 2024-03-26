import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DropdownOption } from '../../../Utility/components/dropdown/dropdown.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/model/services/task.service';
import { CollectionModel } from 'src/model/interfaces';
import { UserService } from 'src/model/services/user.service';
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Filter
{
   name?: String,
   description?: String,
   priority?: String,
   publisherEmail?: String,
   publisherName?: String,
   publisherSurname?: String,
   publisherUsername?: String,
   publisherGender?: String,
   page: number,
   pageSize: number

}

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentPriorities: DropdownOption[] = [];
  public currentGenders: DropdownOption[] = [];
  public searchingPriorities: boolean = true;
  public searchingGenders: boolean = true;
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    publisherEmail: new FormControl(),
    publisherName: new FormControl(),
    publisherSurname: new FormControl(),
    publisherUsername: new FormControl(),
    page: new FormControl(),
    pageSize: new FormControl(),
  })
  @Input() rowDisplay: boolean = false;
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private taskService: TaskService,private userService: UserService) {

  }

  public ngOnInit(): void {
   this.subscriptions.push(this.activatedRoute.queryParams.subscribe((value: any) => {
      let name: string = value.name;
      let description: string = value.description;
      let publisherEmail = value.publisherEmail;
      let publisherName = value.publisherName;
      let publisherSurname = value.publisherSurname;
      let publisherUsername = value.publisherUsername;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.pageSize != undefined ? value.pageSize : 20;
      this.currentFilter = {name: name,description: description,publisherEmail: publisherEmail,publisherName: publisherName,publisherSurname: publisherSurname,publisherUsername: publisherUsername,page: page,pageSize: pageSize};
      this.filterChanged.emit(this.currentFilter);
    }));
    this.searchingPriorities = true;
    this.taskService.getPriorities().subscribe((value: CollectionModel) => {
      this.searchingPriorities = false;
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let currentPriority: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'priority',current)}
          this.currentPriorities.push(currentPriority);
        })
      }
    },(err: any) => this.searchingPriorities = false)
    this.searchingGenders = true;
    this.userService.getGenders().subscribe((value: CollectionModel) => {
      this.searchingGenders = false;
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let currentGender: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'publisherGender',current)};
          this.currentGenders.push(currentGender);
        })
      }
    },(err: any) => this.searchingGenders = false)
    
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe()); 
  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.updateRouter();
    this.filterChanged.emit(this.currentFilter);
  }
  private updateRouter(): void {
    this.router.navigate(['/search/tasks'],{
      skipLocationChange: false,
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge'
    })
  }
}
