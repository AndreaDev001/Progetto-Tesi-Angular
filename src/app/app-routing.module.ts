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
import { UsersPageComponent } from './SearchPages/UserPage/users-page/users-page.component';
import { SearchDiscussionsComponent } from './SearchPages/DiscussionPage/search-discussions/search-discussions.component';
import { SearchPollsComponent } from './SearchPages/PollPage/search-polls/search-polls.component';
import { UnAuthorizedPageComponent } from './Utility/components/un-authorized-page/un-authorized-page.component';
import { AuthGuard } from '../model/auth/auth.guard';
import { ManageBoardPageComponent } from './ManageBoard/manage-board-page/manage-board-page.component';
import { CreatePollComponent } from './Forms/create-poll/create-poll.component';
import { CreateDiscussionComponent } from './Forms/create-discussion/create-discussion.component';
import { CreateReportComponent } from './Forms/create-report/create-report.component';
import { CreateBoardComponent } from './Forms/create-board/create-board.component';
import { CreateTeamComponent } from './Forms/create-team/create-team.component';

const routes: Routes = [
  {path: 'home',component: HomePageComponent,title: 'Home'},
  {path: 'search/boards',component: BoardPageComponent,title: "Search Boards",canActivate: [AuthGuard]},
  {path: 'search/tasks',component: TasksPageComponent,title: "Search Tasks",canActivate: [AuthGuard]},
  {path: 'search/reports',component: ReportPageComponent,title: "Search Reports",canActivate: [AuthGuard]},
  {path: 'search/bans',component: BanPageComponent,title: "Search Bans",canActivate: [AuthGuard]},
  {path: 'search/users',component: UsersPageComponent,title: "Search Users",canActivate: [AuthGuard]},
  {path: 'search/discussions',component: SearchDiscussionsComponent,title: "Search Discussions",canActivate: [AuthGuard]},
  {path: 'search/polls',component: SearchPollsComponent,title: "Search Polls",canActivate: [AuthGuard]},
  {path: 'user/:id',component: UserPageComponent,title: "User",canActivate: [AuthGuard]},
  {path: 'discussion/:id',component: DiscussionPageComponent,title: "Discussion",canActivate: [AuthGuard]},
  {path: 'poll/:id',component: PollPageComponent,title: "Poll",canActivate: [AuthGuard]},
  {path: 'likes/:id',component: LikePagesComponent,title: "Likes",canActivate: [AuthGuard]},
  {path: 'discussions/:id',component: DiscussionsPageComponent,title: 'Discussions',canActivate: [AuthGuard]},
  {path: 'polls/:id',component: PollsPageComponent,title: 'Polls',canActivate: [AuthGuard]},
  {path: "board/:id",component: ManageBoardPageComponent,title: "Manage Board"},
  {path: 'unauthorized',component: UnAuthorizedPageComponent,title: "UnAuthorized"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
