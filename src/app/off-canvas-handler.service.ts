import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffCanvasHandlerService {

  private currentOffCanvasComponent: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentHeaderTitle: BehaviorSubject<string> = new BehaviorSubject('Title');
  private currentHeaderSubtitle: BehaviorSubject<string> = new BehaviorSubject("Subtitle");
  private currentCloseCallback: BehaviorSubject<() => void> = new BehaviorSubject(() => {});
  private currentDismissCallback: BehaviorSubject<() => void> = new BehaviorSubject(() => {});
  private currentHeaderTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentContentTemplate: BehaviorSubject<any> = new BehaviorSubject(undefined);


  constructor() {

  }

  public setCurrentOffCanvas(value: any): void {
    this.currentOffCanvasComponent.next(value);
  }

  public setCallbacks(closeCallback: () => void,dismissCallback: () => void): void {
    this.currentCloseCallback.next(closeCallback);
    this.currentDismissCallback.next(dismissCallback);
  }
  public setTemplates(headerTemplate: any,bodyTemplate: any): void {
    this.currentHeaderTemplate.next(headerTemplate);
    this.currentContentTemplate.next(bodyTemplate);
  }
  public setHeaderTemplate(headerTemplate: any): void {
    this.currentHeaderTemplate.next(headerTemplate);
  }
  public setContentTemplate(contentTemplate: any): void {
    this.currentContentTemplate.next(contentTemplate);
  }
  public setTitle(value: string): void {
    this.currentHeaderTitle.next(value);
  }
  public setSubtitle(value: string): void {
    this.currentHeaderSubtitle.next(value);
  }
  public setTexts(title: string,subtitle: string): void {
    this.currentHeaderTitle.next(title);
    this.currentHeaderSubtitle.next(subtitle);
  }

  public openTexts(title: string,subtitle: string): void {
    this.setTexts(title,subtitle);
    this.open();
  }

  public open(): void {
    if(this.currentOffCanvasComponent != undefined)
        this.currentOffCanvasComponent.value.open();
  }
  public close(): void {
    if(this.currentOffCanvasComponent != undefined)
        this.currentOffCanvasComponent.value.close();
  }

  public getCurrentHeaderTitle(value: boolean): any {return value ? this.currentHeaderTitle.value : this.currentHeaderTitle};
  public getCurrentHeaderSubtitle(value: boolean): any {return value ? this.currentHeaderSubtitle.value : this.currentHeaderSubtitle};
  public getCurrentCloseCallback(value: boolean): any {return value ? this.currentCloseCallback.value : this.currentCloseCallback};
  public getCurrentDismissCallback(value: boolean): any {return value ? this.currentDismissCallback.value : this.currentDismissCallback};
  public getCurrentHeaderTemplate(value: boolean): any {return value ? this.currentHeaderTemplate.value : this.currentHeaderTemplate};
  public getCurrentContentTemplate(value: boolean): any {return value ? this.currentContentTemplate.value : this.currentContentTemplate};
  
}
