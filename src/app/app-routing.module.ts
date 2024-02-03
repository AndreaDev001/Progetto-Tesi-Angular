import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './TaskPage/tasks-page/tasks-page.component';
import { ReportPageComponent } from './ReportPage/report-page/report-page.component';
import { BanPageComponent } from './BanPage/ban-page/ban-page.component';

const routes: Routes = [
  {path: 'search/boards',component: BoardPageComponent,title: "Search Boards"},
  {path: 'search/tasks',component: TasksPageComponent,title: "Search Tasks"},
  {path: 'search/reports',component: ReportPageComponent,title: "Search Reports"},
  {path: 'search/bans',component: BanPageComponent,title: "Search Bans"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
