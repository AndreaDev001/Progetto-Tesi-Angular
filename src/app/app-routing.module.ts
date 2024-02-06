import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './TaskPage/tasks-page/tasks-page.component';
import { ReportPageComponent } from './ReportPage/report-page/report-page.component';
import { BanPageComponent } from './BanPage/ban-page/ban-page.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path: 'home',component: HomePageComponent,title: 'Home'},
  {path: 'search/boards',component: BoardPageComponent,title: "Search Boards"},
  {path: 'search/tasks',component: TasksPageComponent,title: "Search Tasks"},
  {path: 'search/reports',component: ReportPageComponent,title: "Search Reports"},
  {path: 'search/bans',component: BanPageComponent,title: "Search Bans"},
  {path: 'user/:id',component: UserPageComponent,title: "User"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
