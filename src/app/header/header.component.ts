import { Component, OnDestroy, OnInit } from '@angular/core';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBan, faBars, faExclamationCircle, faFilter, faHamburger, faHome, faQuestionCircle, faTable, faTasks, faUser, faUserCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';


interface RouterItem
{
  name: string,
  path: string,
  icon: IconDefinition
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public homeIcon: IconDefinition = faHome;
  public boardIcon: IconDefinition = faTable;
  public taskIcon: IconDefinition = faTasks;
  public banIcon: IconDefinition = faBan;
  public reportIcon: IconDefinition = faWarning;
  public helpIcon: IconDefinition = faQuestionCircle;
  public userIcon: IconDefinition = faUserCircle;
  public hamburgerIcon: IconDefinition = faBars;
  public isCollapsed: boolean = true;
  public items: RouterItem[] = [
    {name: 'Home',icon: faHome,path: ''},
    {name: 'Boards',icon: faTable,path: '/search/boards'},
    {name: 'Tasks',icon: faTasks,path: '/search/tasks'},
    {name: 'Ban',icon: faBan,path: '/search/bans'},
    {name: 'Report',icon: faWarning,path: '/search/reports'}
  ]

  public ngOnInit(): void {
    
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
