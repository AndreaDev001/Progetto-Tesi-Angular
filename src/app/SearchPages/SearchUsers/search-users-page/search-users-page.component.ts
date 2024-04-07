import { AfterViewChecked, AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Page, PagedModel, User } from 'src/model/interfaces';
import { Filter } from '../user-filter/user-filter.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { OffCanvasHandlerService } from 'src/app/Utility/services/off-canvas-handler.service';
import { UserService } from 'src/model/services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-search-users-page',
  templateUrl: './search-users-page.component.html',
  styleUrls: ['./search-users-page.component.css']
})
export class SearchUsersPageComponent implements AfterViewInit,OnDestroy
{
  private subscriptions: Subscription[] = [];
  public currentItems: User[] = [];
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public isSearching: boolean = false;
  public userIcon: IconDefinition = faUsers;
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
    this.offCanvasHandlerService.setTexts("Filters","Use the avaliable filters to find the desired users");
    this.offCanvasHandlerService.open();
  }

  public handlePageChange(page: any): void {
    if(this.currentFilter != undefined) {
      this.currentPage.number = page - 1;
      this.currentFilter.page = this.currentPage.number;
      this.searchUsers();
    }
  }

  public handleFilterChange(filter: Filter): void {
    this.currentFilter = filter;
    this.searchUsers();
  }

  public resetSearch(): void {
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
    this.currentFilter = {page: 0,pageSize: 20};
    this.searchUsers();
  }

  public searchUsers(): void {
    if(this.currentFilter != undefined) {
      this.isSearching = true;
      this.userService.getUsersBySpec(this.currentFilter).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentItems = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.isSearching = false);
    }
  }
}
