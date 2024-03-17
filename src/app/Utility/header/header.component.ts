import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { faBan, faBars, faExclamationCircle, faFilter, faGear, faHamburger, faHeart, faHome, faHouse, faInfoCircle, faMessage, faPlusCircle, faPoll, faQuestionCircle, faSearch, faTable, faTasks, faUser, faUserCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';


interface HeaderOption
{
  name: string,
  icon: IconDefinition,
  callback: () => void;
}
interface HeaderDropdown
{
  name?: string,
  icon: IconDefinition,
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
  public homeIcon: IconDefinition = faHouse;
  public aboutIcon: IconDefinition = faInfoCircle;

  @ViewChild("createBoardTemplate") createBoardTemplate: any;
  @ViewChild("createDiscussionTemplate") createDiscussionTemplate: any;
  @ViewChild("createPollTemplate") createPollTemplate: any;
  @ViewChild("updateUserTemplate") updateUserTemplate: any;

  constructor(public router: Router,public alertHandler: AlertHandlerService) {

  }

  public ngOnInit(): void {
    this.leftDropdowns.push({name: "Search",icon: faSearch,options: this.searchOptions});
    this.leftDropdowns.push({name: "Create",icon: faPlusCircle,options: this.createOptions});
    this.rightDropdowns.push({icon: faUserCircle,options: this.userOptions});
    this.defaultOptions.push({name: "Home",icon: faHouse,callback: () => {this.router.navigate([''])}});
    this.searchOptions.push({name: "Boards",icon: faTable,callback: () => {this.router.navigate(['/search/boards'])}});
    this.searchOptions.push({name: "Tasks",icon: faTasks,callback: () => {this.router.navigate(['/search/tasks'])}});
    this.searchOptions.push({name: "Discussions",icon: faDiscourse,callback: () => {this.router.navigate(['/search/discussions'])}});
    this.searchOptions.push({name: "Polls",icon: faPoll,callback: () => {
      this.router.navigate(['/search/polls']);
    }});
    this.searchOptions.push({name: "Users",icon: faUser,callback: () => this.router.navigate(['/search/users'])})
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
    this.userOptions.push({name: "Boards",icon: faTable,callback: () => {}});
    this.userOptions.push({name: "Tasks",icon: faTasks,callback: () => {}});
    this.userOptions.push({name: "Invites",icon :faMessage,callback: () => {}});
    this.userOptions.push({name: "Likes",icon: faHeart,callback: () => {}});
    this.userOptions.push({name: "Modify",icon: faGear,callback: () => {
      this.alertHandler.reset();
      this.alertHandler.setTextTemplate(this.updateUserTemplate);
      this.alertHandler.open();
    }});
  }

  public ngOnDestroy(): void {
    
  }

  public navigateTo(basePath: string,event: any): void {
    let path: string = basePath + "/" + event.id;
    this.router.navigate([path],event.id).then(() => this.alertHandler.close()).catch(() => this.alertHandler.close());
  }
}
