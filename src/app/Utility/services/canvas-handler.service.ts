import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasHandlerService {

  private currentCanvasComponent: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentHeaderTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentContentTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentFooterTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private isVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private currentDefaultTitle: BehaviorSubject<any> = new BehaviorSubject("Title");
  private currentDefaultSubtitle: BehaviorSubject<any> = new BehaviorSubject("Subtitle");
  private currentDismissCallback: BehaviorSubject<any> = new BehaviorSubject(() => {});
  private currentCloseCallback: BehaviorSubject<any> = new BehaviorSubject(() => {});
  


  constructor() {

  }


  public setCanvasComponent(component: any): void {
    this.currentCanvasComponent.next(component);
  }

  public reset(): void {
    this.isVisible.next(false);
    this.currentDefaultTitle.next("Title");
    this.currentDefaultSubtitle.next("Subtitle");
    this.currentHeaderTemplate.next(undefined);
    this.currentContentTemplate.next(undefined);
    this.currentFooterTemplate.next(undefined);
    this.currentCloseCallback.next(() => {});
    this.currentDismissCallback.next(() => {});
  }
  public setDefaultValues(title: string,subtitle: string): void {
    this.currentDefaultTitle.next(title);
    this.currentDefaultSubtitle.next(subtitle);
  }

  public setHeaderTemplate(headerTemplate: any): void {
    this.currentHeaderTemplate.next(headerTemplate);
  }

  public openDefault(title: string,subtitle: string,contentTemplate: any): void {
    this.setDefaultValues(title,subtitle);
    this.setContentTemplate(contentTemplate);
    this.open();
  }

  public open(): void {
    this.isVisible.next(true);
  }

  public close(): void {
    this.isVisible.next(false);
  }

  public setContentTemplate(contentTemplate: any): void {
    this.currentContentTemplate.next(contentTemplate);
  }

  public setFooterTemplate(footerTemplate: any): void {
    this.currentFooterTemplate.next(footerTemplate);
  }

  public setTemplates(headerTemplate: any,contentTemplate: any,footerTemplate: any): void {
    this.currentHeaderTemplate.next(headerTemplate);
    this.currentContentTemplate.next(contentTemplate);
    this.currentFooterTemplate.next(footerTemplate);
  }

  public setCallbacks(closeCallback: () => void,dismissCallback: () => void): void {
    this.currentCloseCallback.next(closeCallback);
    this.currentDismissCallback.next(dismissCallback);
  }

  public IsVisible(value: boolean): any {return value ? this.isVisible.value : this.isVisible};
  public getCurrentHeaderTemplate(value: boolean): any {return value ? this.currentHeaderTemplate.value : this.currentHeaderTemplate};
  public getCurrentContentTemplate(value: boolean): any {return value ? this.currentContentTemplate.value : this.currentContentTemplate};
  public getCurrentFooterTemplate(value: boolean): any {return value ? this.currentFooterTemplate.value : this.currentFooterTemplate};
  public getCurrentDefaultTitle(value: boolean): any {return value ? this.currentDefaultTitle.value : this.currentDefaultTitle};
  public getCurrentDefaultSubtitle(value: boolean): any {return value ? this.currentDefaultSubtitle.value : this.currentDefaultSubtitle};
  public getCurrentDismissCallback(value: boolean): any {return value ? this.currentDismissCallback.value : this.currentDismissCallback};
  public getCurrentCloseCallback(value: boolean): any {return value ? this.currentCloseCallback.value : this.currentCloseCallback};
}
