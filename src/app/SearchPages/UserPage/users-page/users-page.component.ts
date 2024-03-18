import { AfterViewChecked, AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { PagedModel, User } from 'src/model/interfaces';
import { Filter } from '../user-filter/user-filter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { UserService } from 'src/model/services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements AfterViewInit,OnDestroy
{
  private subscriptions: Subscription[] = [];
  public currentItems: User[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public isSearching: boolean = false;
  public userIcon: IconDefinition = faUserCircle;
  @ViewChild("userFilters") userFilters: any;

  constructor(private offCanvasHandlerService: OffCanvasHandlerService,private userService: UserService) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandlerService.setContentTemplate(this.userFilters);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  public openCanvas(): void {
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentFilter.page = page;
      this.searchUsers();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchUsers();
  }

  public resetSearch(): void {
    this.currentPage = 0;
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchUsers();
  }

  public searchUsers(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.userService.getUsersBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        if(value.page != undefined) {
          this.currentPage = value.page.page;
          this.currentTotalPages = value.page.totalPages;
          this.currentTotalElements = value.page.totalElements;
        }
      },(err: any) => this.isSearching = false);
    }
  }
}
