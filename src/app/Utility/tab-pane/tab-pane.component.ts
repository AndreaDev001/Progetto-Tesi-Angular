import { AfterViewInit, Component, ViewChild , Input, TemplateRef, Output, EventEmitter, ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';


export interface TabPaneOption
{
  name: string,
  icon: IconDefinition,
  subtitle: string,
  callback: () => void;
}
@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.css']
})
export class TabPaneComponent implements AfterViewInit, OnDestroy {
  
  @Input() updateRouter: boolean = false;
  @Input() baseRouterPath: string | undefined = undefined;
  @Input() tabPaneOptions: TabPaneOption[] = [];
  @Input() requiredTemplate: any = undefined;

  private subscriptions: Subscription[] = [];
  public currentTemplate: TemplateRef<any> | undefined = undefined;
  public currentSelectedTab: number = 0;
  @Output() tabChanged: EventEmitter<number> = new EventEmitter();

  @ViewChild("defaultTemplate") defaultTemplate: any;

  constructor(private router: Router) {

  }

  public ngAfterViewInit(): void {
    this.currentTemplate = this.requiredTemplate != undefined ? this.requiredTemplate : this.defaultTemplate;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  public updateCurrentSelectedTab(index: number): void {
    this.currentSelectedTab = index;
    if(this.updateRouter && this.baseRouterPath != undefined) {
      this.router.navigate([this.baseRouterPath],{
        queryParams: {tab: this.currentSelectedTab},
        queryParamsHandling: 'merge',
        skipLocationChange: true
      })
    }
    this.tabChanged.emit(index);
  }
}
