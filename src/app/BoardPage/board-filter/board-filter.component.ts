import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DropdownOption } from 'src/app/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
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
  
  constructor(private boardService: BoardService,private userService: UserService) {

  }

  public ngOnInit(): void {
    this.boardService.getVisibilities().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let visibility: DropdownOption = {name: current,callback: () => this.updateFilter(this.currentFilter,'visibility',current)}
          this.currentVisibilities.push(visibility);
        });
      }
    })
  }

  public updateFilter<Filter, K extends keyof Filter>(obj: Filter, key: K, value: Filter[K]) {
    obj[key] = value;
    this.filterChanged.emit(this.currentFilter);
  }
}
