import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Utility/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardPageComponent } from './SearchPages/BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './SearchPages/TaskPage/tasks-page/tasks-page.component';
import { DropdownComponent } from './Utility/dropdown/dropdown.component';
import { SearchBarComponent } from './Utility/search-bar/search-bar.component';
import { BoardFilterComponent } from './SearchPages/BoardPage/board-filter/board-filter.component';
import { TaskFilterComponent } from './SearchPages/TaskPage/task-filter/task-filter.component';
import { ReportFilterComponent } from './SearchPages/ReportPage/report-filter/report-filter.component';
import { BanFilterComponent } from './SearchPages/BanPage/ban-filter/ban-filter.component';
import { ReportPageComponent } from './SearchPages/ReportPage/report-page/report-page.component';
import { BanPageComponent } from './SearchPages/BanPage/ban-page/ban-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBoardComponent } from './Forms/create-board/create-board.component';
import { CreateTaskComponent } from './Forms/create-task/create-task.component';
import { CreateTeamComponent } from './Forms/create-team/create-team.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCommentComponent } from './Forms/create-comment/create-comment.component';
import { CreateDiscussionComponent } from './Forms/create-discussion/create-discussion.component';
import { CreatePollComponent } from './Forms/create-poll/create-poll.component';
import { CreateReportComponent } from './Forms/create-report/create-report.component';
import { CreateBanComponent } from './Forms/create-ban/create-ban.component';
import { AlertComponentComponent } from './Utility/alert-component/alert-component.component';
import { NoItemsComponent } from './Utility/no-items/no-items.component';
import { LoaderComponent } from './Utility/loader/loader.component';
import { OffCanvasComponent } from './Utility/off-canvas/off-canvas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './Utility/pagination/pagination.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { BoardCardComponent } from './Cards/board-card/board-card.component';
import { TaskCardComponent } from './Cards/task-card/task-card.component';
import { DiscussionCardComponent } from './Cards/discussion-card/discussion-card.component';
import { PollCardComponent } from './Cards/poll-card/poll-card.component';
import { BoardInviteCardComponent } from './Cards/board-invite-card/board-invite-card.component';
import { ReportCardComponent } from './Cards/report-card/report-card.component';
import { BanCardComponent } from './Cards/ban-card/ban-card.component';
import { UserPageComponent } from './UserPage/user-page/user-page.component';
import { UserDetailsComponent } from './UserPage/user-details/user-details.component';
import { DiscussionPageComponent } from './DiscussionPage/discussion-page/discussion-page.component';
import { PollPageComponent } from './PollPage/poll-page/poll-page.component';
import { DiscussionDetailsComponent } from './DiscussionPage/discussion-details/discussion-details.component';
import { DiscussionOptionsComponent } from './DiscussionPage/discussion-options/discussion-options.component';
import { DiscussionCommentComponent } from './DiscussionPage/discussion-comment/discussion-comment.component';
import { PollDetailsComponent } from './PollPage/poll-details/poll-details.component';
import { PollOptionsComponent } from './PollPage/poll-options/poll-options.component';
import { PollOptionComponent } from './PollPage/poll-option/poll-option.component';
import { TextOverflowComponent } from './Utility/text-overflow/text-overflow.component';
import { LikePagesComponent } from './UserPages/LikePages/like-pages/like-pages.component';
import { TabPaneComponent } from './Utility/tab-pane/tab-pane.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { DiscussionsPageComponent } from './UserPages/DiscussionsPage/discussions-page/discussions-page.component';
import { PollsPageComponent } from './UserPages/PollsPage/polls-page/polls-page.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { UsersPageComponent } from './SearchPages/UserPage/users-page/users-page.component';
import { SearchDiscussionsComponent } from './SearchPages/DiscussionPage/search-discussions/search-discussions.component';
import { SearchPollsComponent } from './SearchPages/PollPage/search-polls/search-polls.component';
import { UserFilterComponent } from './SearchPages/UserPage/user-filter/user-filter.component';
import { UserCardComponent } from './user-card/user-card.component';
import { PollFilterComponent } from './SearchPages/PollPage/poll-filter/poll-filter.component';
import { DiscussionFilterComponent } from './SearchPages/DiscussionPage/discussion-filter/discussion-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardPageComponent,
    TasksPageComponent,
    DropdownComponent,
    SearchBarComponent,
    BoardFilterComponent,
    TaskFilterComponent,
    ReportFilterComponent,
    BanFilterComponent,
    ReportPageComponent,
    CreateBoardComponent,
    CreateTaskComponent,
    CreateTeamComponent,
    BanPageComponent,
    CreateCommentComponent,
    CreateDiscussionComponent,
    CreatePollComponent,
    CreateReportComponent,
    CreateBanComponent,
    AlertComponentComponent,
    NoItemsComponent,
    LoaderComponent,
    OffCanvasComponent,
    PaginationComponent,
    HomePageComponent,
    BoardCardComponent,
    TaskCardComponent,
    DiscussionCardComponent,
    PollCardComponent,
    BoardInviteCardComponent,
    ReportCardComponent,
    BanCardComponent,
    UserPageComponent,
    UserDetailsComponent,
    DiscussionPageComponent,
    PollPageComponent,
    DiscussionDetailsComponent,
    DiscussionOptionsComponent,
    DiscussionCommentComponent,
    PollDetailsComponent,
    PollOptionsComponent,
    PollOptionComponent,
    TextOverflowComponent,
    LikePagesComponent,
    TabPaneComponent,
    CommentCardComponent,
    DiscussionsPageComponent,
    PollsPageComponent,
    UsersPageComponent,
    SearchDiscussionsComponent,
    SearchPollsComponent,
    UserFilterComponent,
    UserCardComponent,
    PollFilterComponent,
    DiscussionFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
