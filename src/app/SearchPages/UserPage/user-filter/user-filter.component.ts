import { Component, EventEmitter, OnInit,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownOption } from 'src/app/Utility/components/dropdown/dropdown.component';
import { Output } from '@angular/core';
import { UserService } from 'src/model/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionModel } from 'src/model/interfaces';


export interface Filter
{
  name?: String,
  surname?: String,
  username?: String,
  gender?: String,
  page: number,
  pageSize: number
}
@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit,OnDestroy {
  private subscriptions: Subscription[] = [];
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentGenders: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();

  constructor(private userService: UserService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      let name: string = value.name;
      let surname: string = value.surname;
      let username: string = value.username;
      let gender: string = value.gender;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.pageSize != undefined ? value.pageSize : 20;
      this.currentFilter = {name: name,surname: surname,username: username,gender: gender,page: page,pageSize: pageSize};
      this.filterChanged.emit(this.currentFilter);
    }))
    this.userService.getGenders().subscribe((value: CollectionModel) => {
      if(value._embedded != undefined && value._embedded.content != undefined)
      {
        value._embedded.content.forEach((current: string) => {
          let genderOption: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'gender',current)};
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
    this.router.navigate(['search/users'],{
      skipLocationChange: false,
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge',
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
