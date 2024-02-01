import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownOption } from '../../dropdown/dropdown.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentVisibilities: DropdownOption[] = [];


  public ngOnInit(): void {
    this.currentVisibilities.push({name: "ciao",callback: () => {}})
    this.currentVisibilities.push({name: "ciao",callback: () => {}})
    this.currentVisibilities.push({name: "ciao",callback: () => {}})
    this.currentVisibilities.push({name: "ciao",callback: () => {}})
    this.currentVisibilities.push({name: "ciao",callback: () => {}})
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
