import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService 
{
  private currentOverlayComponent: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentHeaderTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentBodyTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentFooterTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentHeaderTitle: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentContentText: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentCloseCallback: BehaviorSubject<() => void> = new BehaviorSubject(() => {});
  private currentDismissCallback: BehaviorSubject<() => void> = new BehaviorSubject(() => {});
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {

  }

  public setOverlayComponent(component: any): void {
    this.currentOverlayComponent.next(component);
  }

  public setTemplates(headerTemplate: any,contentTemplate: any,footerTemplate: any): void {
    this.currentHeaderTemplate.next(headerTemplate);
    this.currentBodyTemplate.next(contentTemplate);
    this.currentFooterTemplate.next(footerTemplate);
  }

  public setCallbacks(closeCallback: () => void,dismissCallback: () => void): void {
    this.currentCloseCallback.next(closeCallback);
    this.currentDismissCallback.next(dismissCallback);
  }

  public setDefaultTexts(headerTitle: string,contentText: string): void {
    this.currentHeaderTitle.next(headerTitle);
    this.currentContentText.next(contentText);
  }

  public open(headerTemplate: any,contentTemplate: any,footerTemplate: any,closeCallback: () => void,dismissCallback: () => void) {
    this.setTemplates(headerTemplate,contentTemplate,footerTemplate);
    this.setCallbacks(closeCallback,dismissCallback);
  }

  public getCurrentOverlayComponent(value: boolean): any {return value ? this.currentOverlayComponent.value : this.currentOverlayComponent};
  public getCurrentHeaderTitle(value: boolean): any {return value ? this.currentHeaderTitle.value : this.currentHeaderTitle};
  public getCurrentContentText(value: boolean): any {return value ? this.currentContentText.value : this.currentContentText};
  public getCurrentHeaderTemplate(value: boolean): any {return value ? this.currentHeaderTemplate.value : this.currentHeaderTemplate};
  public getCurrentBodyTemplate(value: boolean): any {return value ? this.currentBodyTemplate.value : this.currentBodyTemplate};
  public getCurrentFooterTemplate(value: boolean): any {return value ? this.currentFooterTemplate.value : this.currentFooterTemplate};
  public getCurrentCloseCallback(value: boolean): any {return value ? this.currentCloseCallback.value : this.currentCloseCallback};
  public getCurrentDismissCallback(value: boolean): any {return value ? this.currentDismissCallback.value : this.currentDismissCallback};
  public IsOpen(value: boolean): any {return value ? this.isOpen.value : this.isOpen};
}
