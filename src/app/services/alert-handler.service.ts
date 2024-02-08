import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AlertComponentComponent } from '../Utility/alert-component/alert-component.component';


export interface AlertOption
{
   text: string,
   callback: () => void;
}
@Injectable({
  providedIn: 'root'
})
export class AlertHandlerService {

  private currentAlertComponent: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentAlertTitle: BehaviorSubject<string> = new BehaviorSubject('Title');
  private currentAlertText: BehaviorSubject<string> = new BehaviorSubject('Text');
  private currentAlertOptions: BehaviorSubject<any> = new BehaviorSubject([]);
  private currentAlertHeaderTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentAlertTextTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentAlertFooterTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentCloseCallback: BehaviorSubject<() => void> = new BehaviorSubject(() => {});
  private currentDismissCallback: BehaviorSubject<() => void> = new BehaviorSubject(() => {});

  constructor() {
    let value: AlertOption = {text: "OK",callback: () => this.close()};
    let values: AlertOption[] = this.currentAlertOptions.value;
    values.push(value);
    this.currentAlertOptions.next(values);
  }

  public setCurrentAlertComponent(value: AlertComponentComponent): void {
    this.currentAlertComponent.next(value);
  }

  public setDefaultAlertTitle(value: string): void {
    this.currentAlertTitle.next(value);
  }

  public setDefaultAlertText(value: string): void {
    this.currentAlertText.next(value);
  }

  public setCurrentCloseCallback(value: () => void): void {
    this.currentCloseCallback.next(value);
  }

  public setCurrentDismissCallback(value: () => void): void {
    this.currentDismissCallback.next(value);
  }

  public setHeaderTemplate(headerTemplate: any): void {
    this.currentAlertHeaderTemplate.next(headerTemplate);
  }
  public setTextTemplate(textTemplate: any): void {
    this.currentAlertTextTemplate.next(textTemplate);
  }
  public setFooterTemplate(footerTemplate: any): void {
    this.currentAlertFooterTemplate.next(footerTemplate);
  }

  public addOption(value: AlertOption) {
    let values: AlertOption[] = this.currentAlertOptions.value;
    values.push(value);
    this.currentAlertOptions.next(values);
  }

  public clearOptions(): void {
    this.currentAlertOptions.next([]);
  }

  public setTemplates(headerTemplate: any,textTemplate: any,footerTemplate: any): void {
    this.currentAlertHeaderTemplate.next(headerTemplate);
    this.currentAlertTextTemplate.next(textTemplate);
    this.currentAlertFooterTemplate.next(footerTemplate);
  }

  public setDefaultValues(title: string,text: string): void {
    this.currentAlertTitle.next(title);
    this.currentAlertText.next(text);
  }

  public setCallbacks(closeCallback: () => void,dismissCallback: () => void): void {
    this.currentCloseCallback.next(closeCallback);
    this.currentDismissCallback.next(dismissCallback);
  }

  public openDefault(title: string,text: string): void {
    this.setDefaultValues(title,text);
    this.open();
  }

  public openTemplates(headerTemplate: any,contentTemplate: any,footerTemplate: any): void {
    this.setTemplates(headerTemplate,contentTemplate,footerTemplate);
    this.open();
  }
  
  public open(): void {
    if(this.currentAlertComponent.value != undefined) {
      this.currentAlertComponent.value.open();
    }
  }
  public close(): void {
    if(this.currentAlertComponent.value != undefined) {
      this.currentAlertComponent.value.close();
    }
  }

  public getCurrentAlertTitle(value: boolean) : any {return value ? this.currentAlertTitle.value : this.currentAlertTitle};
  public getCurrentAlertText(value: boolean): any {return value ? this.currentAlertText.value : this.currentAlertText};
  public getCurrentAlertOptions(value: boolean): any {return value ? this.currentAlertOptions.value : this.currentAlertOptions};
  public getCurrentAlertHeaderTemplate(value: boolean): any {return value ? this.currentAlertHeaderTemplate.value : this.currentAlertHeaderTemplate};
  public getCurrentAlertContentTemplate(value: boolean): any {return value ? this.currentAlertTextTemplate.value : this.currentAlertTextTemplate};
  public getCurrentAlertFooterTemplate(value: boolean): any {return value ? this.currentAlertFooterTemplate.value : this.currentAlertFooterTemplate};
  public getCurrentCloseCallback(value: boolean): any {return value ? this.currentCloseCallback.value : this.currentCloseCallback};
  public getCurrentDismissCallback(value: boolean): any {return value ? this.currentDismissCallback.value : this.currentDismissCallback}
}
