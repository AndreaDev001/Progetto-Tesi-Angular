import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownOption } from '../../dropdown/dropdown.component';
import { UserService } from 'src/model/services/user.service';
import { CollectionModel } from 'src/model/interfaces';
import { Filter } from '../board-filter/board-filter.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];

  public ngOnInit(): void {


  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public handleFilterChange(filter: Filter): void {
     
  }
}
