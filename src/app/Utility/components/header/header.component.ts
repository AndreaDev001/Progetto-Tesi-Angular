import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown, faArrowUp, faBan, faBars, faCaretDown, faCaretUp, faEllipsis, faEllipsisH, faExclamationCircle, faFilter, faGear, faHamburger, faHeart, faHome, faHouse, faInfo, faInfoCircle, faMessage, faPlusCircle, faPoll, faQuestionCircle, faSearch, faTable, faTasks, faUser, faUserCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';


interface HeaderOption
{
  name: string,
  icon: IconDefinition,
  callback: () => void;
  admin?: boolean,
}
interface HeaderDropdown
{
  name?: string,
  icon: IconDefinition,
  key: string
  options: HeaderOption[];
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  public leftDropdowns: HeaderDropdown[] = [];
  public rightDropdowns: HeaderDropdown[] = [];
  public defaultOptions: HeaderOption[] = [];
  public searchOptions: HeaderOption[] = [];
  public createOptions: HeaderOption[] = [];
  public userOptions: HeaderOption[] = [];
  public isAdmin: boolean = false;
  public headerVisible: boolean = false;

  public homeIcon: IconDefinition = faHouse;
  public aboutIcon: IconDefinition = faInfoCircle;
  public headerIcon: IconDefinition = faEllipsisH;
  public openCollapsedIcon: IconDefinition = faCaretUp;
  public closeCollapsedIcon: IconDefinition = faCaretDown;
  public optionsIcon: IconDefinition = faBars;
  public infoIcon: IconDefinition = faInfoCircle;

  public optionsCollapsed: boolean = true;
  public isCollapsed: boolean[] = [];
  public optionsMap: Map<string,any[]> = new Map();

  private subscriptions: Subscription[] = [];

  @ViewChild("createBoardTemplate") createBoardTemplate: any;
  @ViewChild("createDiscussionTemplate") createDiscussionTemplate: any;
  @ViewChild("createPollTemplate") createPollTemplate: any;
  @ViewChild("updateUserTemplate") updateUserTemplate: any;

  constructor(public router: Router,public alertHandler: AlertHandlerService,public authHandlerService: AuthHandlerService) {

  }

  public ngOnInit(): void {
    this.createHeaderOptions();
    this.createMapValues();
    this.subscriptions.push(this.authHandlerService.getCurrentUserID(false).subscribe((value: any) => {
      this.isAdmin = this.authHandlerService.isAdmin();
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  private createHeaderOptions(): void {
    this.defaultOptions.push({name: "Home",icon: faHouse,callback: () => {this.router.navigate([''])}});
    this.createDropdowns();
    this.createSearchOptions();
    this.createCreateOptions();
    this.createUserOptions();
  }

  private createMapValues(): void {
    this.optionsMap.set('search',this.searchOptions);
    this.optionsMap.set('create',this.createOptions);
    this.optionsMap.set('user',this.userOptions);
  }

  private createDropdowns(): void {
    this.leftDropdowns.push({name: "Search",icon: faSearch,options: this.searchOptions,key: 'search'});
    this.leftDropdowns.push({name: "Create",icon: faPlusCircle,options: this.createOptions,key: 'create'});
    this.rightDropdowns.push({name: "User",icon: faUserCircle,options: this.userOptions,key: 'user'});
    for(let i = 0;i < 4;i++) {
      this.isCollapsed[i] = true;
    }
  }

  private createSearchOptions(): void {
    this.searchOptions.push({name: "Boards",icon: faTable,callback: () => {this.router.navigate(['/search/boards'])}});
    this.searchOptions.push({name: "Tasks",icon: faTasks,callback: () => {this.router.navigate(['/search/tasks'])}});
    this.searchOptions.push({name: "Discussions",icon: faDiscourse,callback: () => {this.router.navigate(['/search/discussions'])}});
    this.searchOptions.push({name: "Polls",icon: faPoll,callback: () => {
      this.router.navigate(['/search/polls']);
    }});
    this.searchOptions.push({name: "Users",icon: faUser,callback: () => this.router.navigate(['/search/users'])})
    this.searchOptions.push({name: "Reports",icon: faWarning,callback: () => this.router.navigate(['/search/reports']),admin: true});
    this.searchOptions.push({name: "Bans",icon: faBan,callback: () => this.router.navigate(['/search/bans']),admin: true});
  }

  private createCreateOptions(): void {
    this.createOptions.push({name: "Board",icon: faTable,callback: () => {
      this.alertHandler.reset();
      this.alertHandler.setTextTemplate(this.createBoardTemplate);
      this.alertHandler.open();
    }});
    this.createOptions.push({name: "Discussion",icon: faDiscourse,callback: () => {
      this.alertHandler.reset();
      this.alertHandler.setTextTemplate(this.createDiscussionTemplate);
      this.alertHandler.open();
    }});
    this.createOptions.push({name: "Poll",icon: faPoll,callback: () => {
      this.alertHandler.reset();
      this.alertHandler.setTextTemplate(this.createPollTemplate);
      this.alertHandler.open();
    }});
  }

  private createUserOptions(): void {
    this.userOptions.push({name: "Discussions",icon: faDiscourse,callback: () => {this.router.navigate(["/discussions"])}});
    this.userOptions.push({name: "Polls",icon: faPoll,callback: () => {this.router.navigate(["/polls"])}});
    this.userOptions.push({name: "Boards",icon: faTable,callback: () => {this.router.navigate(["/boards"])}});
    this.userOptions.push({name: "Tasks",icon: faTasks,callback: () => {this.router.navigate(["/tasks"])}});
    this.userOptions.push({name: "Invites",icon: faMessage,callback: () => {this.router.navigate(["/invites"])}})
    this.userOptions.push({name: "Modify",icon: faGear,callback: () => {
      this.alertHandler.reset();
      this.alertHandler.setTextTemplate(this.updateUserTemplate);
      this.alertHandler.open();
    }});
  }

  public resetCollapsed(): void {
    for(let i = 0;i < this.leftDropdowns.length + this.rightDropdowns.length;i++) {
      this.isCollapsed[i] = true;
    }
  }

  public updateCollapsed(): void {
    this.optionsCollapsed = !this.optionsCollapsed;
    if(this.optionsCollapsed)
        this.resetCollapsed();
  }

  public navigateTo(basePath: string,event: any): void {
    let path: string = basePath + "/" + event.id;
    this.router.navigate([path],event.id).then(() => this.alertHandler.close()).catch(() => this.alertHandler.close());
  }
}
