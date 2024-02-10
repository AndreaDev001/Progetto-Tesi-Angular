import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './SearchPages/BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './SearchPages/TaskPage/tasks-page/tasks-page.component';
import { ReportPageComponent } from './SearchPages/ReportPage/report-page/report-page.component';
import { BanPageComponent } from './SearchPages/BanPage/ban-page/ban-page.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { UserPageComponent } from './UserPage/user-page/user-page.component';
import { DiscussionPageComponent } from './DiscussionPage/discussion-page/discussion-page.component';
import { DiscussionsPageComponent } from './UserPages/DiscussionsPage/discussions-page/discussions-page.component';
import { PollsPageComponent } from './UserPages/PollsPage/polls-page/polls-page.component';
import { PollPageComponent } from './PollPage/poll-page/poll-page.component';
import { LikePagesComponent } from './UserPages/LikePages/like-pages/like-pages.component';

const routes: Routes = [
  {path: 'home',component: HomePageComponent,title: 'Home'},
  {path: 'search/boards',component: BoardPageComponent,title: "Search Boards"},
  {path: 'search/tasks',component: TasksPageComponent,title: "Search Tasks"},
  {path: 'search/reports',component: ReportPageComponent,title: "Search Reports"},
  {path: 'search/bans',component: BanPageComponent,title: "Search Bans"},
  {path: 'user/:id',component: UserPageComponent,title: "User"},
  {path: 'discussion/:id',component: DiscussionPageComponent,title: "Discussion"},
  {path: 'poll/:id',component: PollPageComponent,title: "Poll"},
  {path: 'likes/:id',component: LikePagesComponent,title: "Likes"},
  {path: 'discussions/:id',component: DiscussionsPageComponent,title: 'Discussions'},
  {path: 'polls/:id',component: PollsPageComponent,title: 'Polls'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
