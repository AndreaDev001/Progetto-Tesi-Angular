import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { UserPageComponent } from './UserPage/user-page/user-page.component';
import { DiscussionPageComponent } from './DiscussionPage/discussion-page/discussion-page.component';
import { DiscussionsPageComponent } from './UserPages/DiscussionsPage/discussions-page/discussions-page.component';
import { PollsPageComponent } from './UserPages/PollsPage/polls-page/polls-page.component';
import { PollPageComponent } from './PollPage/poll-page/poll-page.component';
import { LikePagesComponent } from './UserPages/LikePages/like-pages/like-pages.component';

import { UnAuthorizedPageComponent } from './Utility/components/un-authorized-page/un-authorized-page.component';
import { AuthGuard } from '../model/auth/auth.guard';
import { ManageBoardPageComponent } from './ManageBoard/manage-board-page/manage-board-page.component';
import { BoardInvitesComponent } from './UserPages/BoardInvites/board-invites/board-invites.component';
import { BoardsPageComponent } from './UserPages/BoardsPage/boards-page/boards-page.component';
import { TasksPageComponent } from './UserPages/TasksPage/tasks-page/tasks-page.component';
import { SearchBoardPageComponent } from './SearchPages/SearchBoards/board-page/search-board-page.component';
import { SearchTasksPageComponent } from './SearchPages/SearchTasks/search-tasks-page/search-tasks-page.component';
import { SearchReportsPageComponent } from './SearchPages/SearchReports/search-reports-page/search-reports-page.component';
import { SearchBanPageComponent } from './SearchPages/SearchBans/search-ban-page/search-ban-page.component';
import { SearchUsersPageComponent } from './SearchPages/SearchUsers/search-users-page/search-users-page.component';
import { SearchDiscussionsPageComponent } from './SearchPages/SearchDiscussions/search-discussions/search-discussions-page.component';
import { SearchPollsPageComponent } from './SearchPages/SearchPolls/search-polls-page/search-polls-page.component';

const routes: Routes = [
  {path: 'home',component: HomePageComponent,title: 'Home',canActivate: [AuthGuard]},
  {path: 'search/boards',component: SearchBoardPageComponent,title: "Search Boards",canActivate: [AuthGuard]},
  {path: 'search/tasks',component: SearchTasksPageComponent,title: "Search Tasks",canActivate: [AuthGuard]},
  {path: 'search/reports',component: SearchReportsPageComponent,title: "Search Reports",canActivate: [AuthGuard]},
  {path: 'search/bans',component: SearchBanPageComponent,title: "Search Bans",canActivate: [AuthGuard]},
  {path: 'search/users',component: SearchUsersPageComponent,title: "Search Users",canActivate: [AuthGuard]},
  {path: 'search/discussions',component: SearchDiscussionsPageComponent,title: "Search Discussions",canActivate: [AuthGuard]},
  {path: 'search/polls',component: SearchPollsPageComponent,title: "Search Polls",canActivate: [AuthGuard]},
  {path: 'user/:id',component: UserPageComponent,title: "User",canActivate: [AuthGuard]},
  {path: 'discussion/:id',component: DiscussionPageComponent,title: "Discussion",canActivate: [AuthGuard]},
  {path: 'poll/:id',component: PollPageComponent,title: "Poll",canActivate: [AuthGuard]},
  {path: 'likes/:id',component: LikePagesComponent,title: "Likes",canActivate: [AuthGuard]},
  {path: 'discussions',component: DiscussionsPageComponent,title: 'Discussions',canActivate: [AuthGuard]},
  {path: 'polls',component: PollsPageComponent,title: 'Polls',canActivate: [AuthGuard]},
  {path: 'invites',component: BoardInvitesComponent,title: 'Invites',canActivate: [AuthGuard]},
  {path: 'boards',component: BoardsPageComponent,title: 'Boards',canActivate: [AuthGuard]},
  {path: 'tasks',component: TasksPageComponent,title: 'Tasks',canActivate: [AuthGuard]},
  {path: "board/:id",component: ManageBoardPageComponent,title: "Manage Board",canActivate: [AuthGuard]},
  {path: 'unauthorized',component: UnAuthorizedPageComponent,title: "UnAuthorized"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
