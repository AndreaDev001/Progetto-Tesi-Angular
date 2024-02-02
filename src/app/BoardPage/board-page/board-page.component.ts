import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownOption } from '../../dropdown/dropdown.component';
import { UserService } from 'src/model/services/user.service';
import { CollectionModel } from 'src/model/interfaces';
import { Filter } from '../board-filter/board-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertHandlerService } from 'src/app/alert-handler.service';
import { OffCanvasHandlerService } from 'src/app/off-canvas-handler.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnDestroy,AfterViewInit{

  private subscriptions: Subscription[] = [];
  @ViewChild("boardFilters") boardFilters: any;

  constructor(private offCanvasHandler: OffCanvasHandlerService) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandler.setContentTemplate(this.boardFilters);
    this.offCanvasHandler.open();
  }


  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public handleFilterChange(filter: Filter): void {
     
  }
}
