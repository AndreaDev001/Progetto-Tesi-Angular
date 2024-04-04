import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertHandlerService, AlertOption } from '../../services/alert-handler.service';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css']
})
export class AlertComponentComponent implements OnDestroy,AfterViewInit{

  @ViewChild("defaultHeaderTemplate") defaultHeaderTemplate: any;
  @ViewChild("defaultContentTemplate") defaultContentTemplate: any;
  @ViewChild("defaultFooterTemplate") defaultFooterTemplate: any;
  @ViewChild("modalTemplate") modalTemplate: any;

  public currentAlertTitle: string | undefined = undefined;
  public currentAlertSubtitle: string | undefined = undefined;
  public currentAlertText: string | undefined = undefined;
  public currentAlertOptions: AlertOption[] = [];
  public currentHeaderTemplate: any = undefined;
  public currentContentTemplate: any = undefined;
  public currentFooterTemplate: any = undefined;
  public currentCloseCallback: () => void = () => {};
  public currentDismissCallback: () => void = () => {};
  private currentModal: NgbModalRef | undefined = undefined;
  private subscriptions: Subscription[] = [];
  private closeModalSubscription: Subscription | undefined = undefined;
  private dismissModalSubscription: Subscription | undefined = undefined;


  constructor(private alertHandler: AlertHandlerService,private modalService: NgbModal) {

  }

  public ngAfterViewInit(): void {
    this.alertHandler.setCurrentAlertComponent(this);
    this.createSubscriptions();

  }

  private createSubscriptions(): void {
    this.subscriptions.push(this.alertHandler.getCurrentAlertTitle(false).subscribe((value: string) => this.currentAlertTitle = value));
    this.subscriptions.push(this.alertHandler.getCurrentAlertText(false).subscribe((value: string) => this.currentAlertText = value));
    this.subscriptions.push(this.alertHandler.getCurrentAlertOptions(false).subscribe((value: any) => {
      this.currentAlertOptions = value;
    }));
    this.subscriptions.push(this.alertHandler.getCurrentAlertSubtitle(false).subscribe((value: any) => this.currentAlertSubtitle = value));
    this.subscriptions.push(this.alertHandler.getCurrentAlertHeaderTemplate(false).subscribe((value: any) => this.currentHeaderTemplate = this.updateTemplate(value,this.defaultHeaderTemplate)));
    this.subscriptions.push(this.alertHandler.getCurrentAlertContentTemplate(false).subscribe((value: any) => this.currentContentTemplate = this.updateTemplate(value,this.defaultContentTemplate)));
    this.subscriptions.push(this.alertHandler.getCurrentAlertFooterTemplate(false).subscribe((value: any) => this.currentFooterTemplate = this.updateTemplate(value,this.defaultFooterTemplate)));
    this.subscriptions.push(this.alertHandler.getCurrentCloseCallback(false).subscribe((value: () => void) => this.currentCloseCallback = value));
    this.subscriptions.push(this.alertHandler.getCurrentDismissCallback(false).subscribe((value: () => void) => this.currentDismissCallback = value));
  }

  public updateTemplate(requiredValue: any,defaultValue: any): void {
    return requiredValue != undefined ? requiredValue : defaultValue;
  }

  public open(): void {
    this.currentModal = this.modalService.open(this.modalTemplate);
    if(this.currentModal != undefined) {
      if(this.closeModalSubscription != undefined) {
        this.closeModalSubscription.unsubscribe();
        this.closeModalSubscription = undefined;
      }
      if(this.dismissModalSubscription != undefined) {
        this.dismissModalSubscription.unsubscribe();
        this.dismissModalSubscription = undefined;
      }
      this.closeModalSubscription = this.currentModal.closed.subscribe((value: any) => this.currentCloseCallback());
      this.dismissModalSubscription = this.currentModal.dismissed.subscribe((value: any) => this.currentDismissCallback());
    }
  }

  public close(): void {
    if(this.currentModal != undefined)
        this.currentModal.close();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
