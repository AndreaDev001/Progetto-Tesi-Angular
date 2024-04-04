import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasHandlerService } from '../../../canvas-handler.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit,OnDestroy {

  @ViewChild("defaultHeaderTemplate") defaultHeaderTemplate: any;
  @ViewChild("defaultFooterTemplate") defaultFooterTemplate: any;

  private subscriptions: Subscription[] = [];
  public currentTitle: string | undefined = undefined;
  public currentSubtitle: string | undefined = undefined;
  public currentHeaderTemplate: any = undefined;
  public currentContentTemplate: any = undefined;
  public currentFooterTemplate: any = undefined;
  public isVisible: boolean = false;
  private currentCloseCallback: () => void = () => {};

  constructor(private canvasHandler: CanvasHandlerService) {

  }

  public ngAfterViewInit(): void {
    this.createSubcriptions();
  }

  private createSubcriptions(): void {
    this.subscriptions.push(this.canvasHandler.IsVisible(false).subscribe((value: any) => this.isVisible = value));
    this.subscriptions.push(this.canvasHandler.getCurrentDefaultTitle(false).subscribe((value: any) => this.currentTitle = value));
    this.subscriptions.push(this.canvasHandler.getCurrentDefaultSubtitle(false).subscribe((value: any) => this.currentSubtitle = value));
    this.subscriptions.push(this.canvasHandler.getCurrentHeaderTemplate(false).subscribe((value: any) => this.currentHeaderTemplate = value != undefined ? value : this.defaultHeaderTemplate));
    this.subscriptions.push(this.canvasHandler.getCurrentContentTemplate(false).subscribe((value: any) => this.currentContentTemplate = value));
    this.subscriptions.push(this.canvasHandler.getCurrentFooterTemplate(false).subscribe((value: any) => this.currentFooterTemplate = value != undefined ? value : this.defaultFooterTemplate));
    this.subscriptions.push(this.canvasHandler.getCurrentCloseCallback(false).subscribe((value: any) => this.currentCloseCallback = value));
  }

  public close(): void {
    this.currentCloseCallback();
    this.canvasHandler.close();
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
