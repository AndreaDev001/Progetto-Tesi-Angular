import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './TaskPage/tasks-page/tasks-page.component';

const routes: Routes = [
  {path: 'search/boards',component: BoardPageComponent,title: "Search Boards"},
  {path: 'search/tasks',component: TasksPageComponent,title: "Search Tasks"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
