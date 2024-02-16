import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements AfterViewInit,OnDestroy {

  private subscriptions: Subscription[] = [];

  @ViewChild("defaultHeaderTemplate") defaultHeaderTemplate: any;
  @ViewChild("defaultContentTemplate") defaultContentTemplate: any;
  @ViewChild("defaultFooterTemplate") defaultFooterTemplate: any;

  public currentHeaderTemplate: any = undefined;
  public currentBodyTemplate: any = undefined;
  public currentFooterTemplate: any = undefined;
  public currentHeaderTitle: any = undefined;
  public currentContentText: any = undefined;
  public currentCloseCallback: () => void = () => {};
  public currentDismissCallback: () => void = () => {};
  public closeIcon: IconDefinition = faClose;

  constructor(private overlayService: OverlayService) {

  }

  public ngAfterViewInit(): void {
    this.currentHeaderTemplate = this.defaultHeaderTemplate;
    this.currentBodyTemplate = this.defaultContentTemplate;
    this.currentFooterTemplate = this.defaultFooterTemplate;
    this.overlayService.setOverlayComponent(this);
    this.subscriptions.push(this.overlayService.getCurrentHeaderTitle(false).subscribe((value: any) => this.currentHeaderTitle = value));
    this.subscriptions.push(this.overlayService.getCurrentContentText(false).subscribe((value: any) => this.currentContentText = value));
    this.subscriptions.push(this.overlayService.getCurrentHeaderTemplate(false).subscribe((value: any) => this.currentHeaderTemplate = value != undefined ? value : this.defaultHeaderTemplate));
    this.subscriptions.push(this.overlayService.getCurrentBodyTemplate(false).subscribe((value: any) => this.currentBodyTemplate = value != undefined ?  value : this.currentBodyTemplate));
    this.subscriptions.push(this.overlayService.getCurrentFooterTemplate(false).subscribe((value: any) => this.currentFooterTemplate = value != undefined ? value : this.currentFooterTemplate));
    this.subscriptions.push(this.overlayService.getCurrentCloseCallback(false).subscribe((value: any) => this.currentCloseCallback = value));
    this.subscriptions.push(this.overlayService.getCurrentDismissCallback(false).subscribe((value: any) => this.currentDismissCallback = value));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
