import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOption } from 'src/app/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { UserService } from 'src/model/services/user.service';

export interface Filter
{
  title?: String;
  description?: String;
  publisherEmail?: String;
  publisherUsername?: String;
  publisherName?: String;
  publisherSurname?: String;
  publisherGender?: String,
  visibility?: String
  page: number,
  pageSize: number,
}
@Component({
  selector: 'app-board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.css']
})
export class BoardFilterComponent implements OnInit
{
  public currentFilter: Filter = {page: 0,pageSize: 20};
  public currentVisibilities: DropdownOption[] = [];
  public currentGenders: DropdownOption[] = [];
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();
  
  constructor(private boardService: BoardService,private userService: UserService,private router: Router,private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value: any) => {
      let title: String = value.title;
      let description: String = value.description;
      let publisherEmail: String = value.publisherEmail;
      let publisherName: String = value.publisherName;
      let publisherSurname: String = value.publisherSurname;
      let publisherUsername: String = value.publisherUsername;
      let publisherGender: String = value.publisherGender;
      let visibility: String = value.visibility;
      let page: number = value.page != undefined ? value.page : 0;
      let pageSize: number = value.pageSize != undefined ? value.pageSize : 20;
      this.currentFilter = {title: title,description: description,publisherEmail: publisherEmail,publisherName: publisherName,publisherSurname: publisherSurname,publisherUsername: publisherUsername,publisherGender: publisherGender,visibility: visibility,page: page,pageSize: pageSize};
    })
    this.boardService.getVisibilities().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let visibility: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'visibility',current)}
          this.currentVisibilities.push(visibility);
        });
      }
    })
    this.userService.getGenders().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let gender: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'publisherGender',current)}
          this.currentGenders.push(gender);
        })
      }
    })
  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.updateRouter();
    this.filterChanged.emit(this.currentFilter);
  }

  private updateRouter() {
    this.router.navigate(['/search/boards'],{
      skipLocationChange: false,
      queryParams: this.currentFilter,
      queryParamsHandling: 'merge'
    });
  }
}
