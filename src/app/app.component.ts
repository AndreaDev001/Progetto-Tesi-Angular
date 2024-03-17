import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthHandlerService } from '../model/auth/auth-handler.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CanvasHandlerService } from './canvas-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'Progetto-Tirocinio-Angular';

  private subscriptions: Subscription[] = [];
  public canvasVisible: boolean = false;

  constructor(private canvasHandler: CanvasHandlerService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.canvasHandler.IsVisible(false).subscribe((value: any) => this.canvasVisible = value ));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
