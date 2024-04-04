import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OffCanvasHandlerService } from '../../services/off-canvas-handler.service';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.css']
})
export class OffCanvasComponent implements AfterViewInit,OnDestroy
{
  @ViewChild("defaultHeaderTemplate") defaultHeaderTemplate: any;
  @ViewChild("offcanvas") offcanvas: any;

  private subscriptions: Subscription[] = [];
  private closeSubscription: Subscription | undefined = undefined;
  private dismissSubscription: Subscription | undefined = undefined;

  public currentTitle: string | undefined = undefined;
  public currentHeaderTemplate: any = undefined;
  public currentContentTemplate: any = undefined;
  public currentCloseCallback: () => void = () => {};
  public currentDismissCallback: () => void = () => {};
  
  public currentOffCanvas: NgbOffcanvasRef | undefined = undefined;

  constructor(private offCanvasHandler: OffCanvasHandlerService,private offCanvasRef: NgbOffcanvas) {

  }

  public ngAfterViewInit(): void {
    this.offCanvasHandler.setCurrentOffCanvas(this);
    this.createSubcriptions();
  }

  private createSubcriptions(): void {
    this.subscriptions.push(this.offCanvasHandler.getCurrentHeaderTemplate(false).subscribe((value: any) => this.currentHeaderTemplate = this.updateTemplate(value,this.defaultHeaderTemplate)));
    this.subscriptions.push(this.offCanvasHandler.getCurrentContentTemplate(false).subscribe((value: any) => this.currentContentTemplate = value));
    this.subscriptions.push(this.offCanvasHandler.getCurrentHeaderTitle(false).subscribe((value: string) => this.currentTitle = value));
    this.subscriptions.push(this.offCanvasHandler.getCurrentCloseCallback(false).subscribe((value: () => void) => this.currentCloseCallback = value));
    this.subscriptions.push(this.offCanvasHandler.getCurrentDismissCallback(false).subscribe((value: () => void) => this.currentDismissCallback = value));
  }

  public open(): void {
    this.currentOffCanvas = this.offCanvasRef.open(this.offcanvas);
    if(this.currentOffCanvas != undefined) {
      if(this.closeSubscription != undefined) {
        this.closeSubscription.unsubscribe();
        this.closeSubscription = undefined;
      }
      if(this.dismissSubscription != undefined) {
        this.dismissSubscription.unsubscribe();
        this.dismissSubscription = undefined;
      }
    }
    this.currentOffCanvas.closed.subscribe((value: any) => this.currentCloseCallback());
    this.currentOffCanvas.dismissed.subscribe((value: any) => this.currentDismissCallback());
  }

  public close(): void {
    if(this.currentOffCanvas != undefined)
        this.currentOffCanvas.close();
  }

  private updateTemplate(requiredValue: any,defaultValue: any): any {
    return requiredValue != undefined ? requiredValue : defaultValue;
  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
