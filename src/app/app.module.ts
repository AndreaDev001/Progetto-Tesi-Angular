import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Utility/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from './Utility/components/dropdown/dropdown.component';
import { SearchBarComponent } from './Utility/components/search-bar/search-bar.component';
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
import { AlertComponentComponent } from './Utility/components/alert-component/alert-component.component';
import { NoItemsComponent } from './Utility/components/no-items/no-items.component';
import { LoaderComponent } from './Utility/components/loader/loader.component';
import { OffCanvasComponent } from './Utility/components/off-canvas/off-canvas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './Utility/components/pagination/pagination.component';
import { NgxSpinnerModule } from 'ngx-spinner';
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
import { PollDetailsComponent } from './PollPage/poll-details/poll-details.component';
import { PollOptionComponent } from './PollPage/poll-option/poll-option.component';
import { TextOverflowComponent } from './Utility/components/text-overflow/text-overflow.component';
import { LikePagesComponent } from './UserPages/LikePages/like-pages/like-pages.component';
import { TabPaneComponent } from './Utility/components/tab-pane/tab-pane.component';
import { CommentCardComponent } from './Cards/comment-card/comment-card.component';
import { DiscussionsPageComponent } from './UserPages/DiscussionsPage/discussions-page/discussions-page.component';
import { PollsPageComponent } from './UserPages/PollsPage/polls-page/polls-page.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { SearchUsersPageComponent } from './SearchPages/SearchUsers/search-users-page/search-users-page.component';
import { SearchDiscussionsPageComponent } from './SearchPages/SearchDiscussions/search-discussions/search-discussions-page.component';
import { SearchPollsPageComponent } from './SearchPages/SearchPolls/search-polls-page/search-polls-page.component';
import { UserFilterComponent } from './SearchPages/SearchUsers/user-filter/user-filter.component';
import { UserCardComponent } from './Cards/user-card/user-card.component';
import { PollFilterComponent } from './SearchPages/SearchPolls/poll-filter/poll-filter.component';
import { DiscussionFilterComponent } from './SearchPages/SearchDiscussions/discussion-filter/discussion-filter.component';
import { HomePageComponent } from './HomePage/home-page/home-page.component';
import { UnAuthorizedPageComponent } from './Utility/components/un-authorized-page/un-authorized-page.component';
import { RefreshInterceptor } from '../model/auth/RefreshInterceptor';
import { ManageBoardPageComponent } from './ManageBoard/manage-board-page/manage-board-page.component';
import { TaskElementComponent } from './ManageBoard/task-element/task-element.component';
import { TaskTagComponent } from './ManageBoard/task-tag/task-tag.component';
import { BoardHeaderComponent } from './ManageBoard/board-header/board-header.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { OverlayComponent } from './Utility/components/overlay/overlay.component';
import { TaskOverlayComponent } from './ManageBoard/task-overlay/task-overlay.component'
import {MatSelectModule} from '@angular/material/select';
import { UserHolderComponent } from './Utility/components/user-holder/user-holder.component';
import { AddUserComponent } from './Utility/components/add-user/add-user.component';
import { CreateInviteComponent } from './Forms/create-invite/create-invite.component';
import { CanvasComponent } from './Utility/components/canvas/canvas.component';
import { MultiSelectionComponent } from './Utility/components/multi-selection/multi-selection.component';
import { CreateTagComponent } from './Forms/create-tag/create-tag.component';
import { NgxColorsModule } from 'ngx-colors';
import { CreateCheckListComponent } from './Forms/create-check-list/create-check-list.component';
import { ChecklistComponent } from './ManageBoard/checklist/checklist.component';
import { CreateCheckListOptionComponent } from './Forms/create-check-list-option/create-check-list-option.component';
import { CreateTaskImageComponent } from './Forms/create-task-image/create-task-image.component';
import { NgxEditorModule } from 'ngx-editor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BetterImageComponent } from './Utility/components/better-image/better-image.component';
import { SearchSelectionComponent } from './Utility/components/search-selection/search-selection.component';
import { ModifyUserComponent } from './Forms/modify-user/modify-user.component';
import { CreateTaskURLComponent } from './Forms/create-task-url/create-task-url.component';
import { TaskURLComponent } from './ManageBoard/task-url/task-url.component';
import { CreateTaskFileComponent } from './Forms/create-task-file/create-task-file.component';
import { TaskFileComponent } from './ManageBoard/task-file/task-file.component';
import { PollOptionsComponent } from './PollPage/poll-options/poll-options.component';
import { CreatePollOptionComponent } from './Forms/create-poll-option/create-poll-option.component';
import { BoardsPageComponent } from './UserPages/BoardsPage/boards-page/boards-page.component';
import { BoardInvitesComponent } from './UserPages/BoardInvites/board-invites/board-invites.component';
import { SearchTasksPageComponent } from './SearchPages/SearchTasks/search-tasks-page/search-tasks-page.component';
import { SearchReportsPageComponent } from './SearchPages/SearchReports/search-reports-page/search-reports-page.component';
import { SearchBanPageComponent } from './SearchPages/SearchBans/search-ban-page/search-ban-page.component';
import { TaskFilterComponent } from './SearchPages/SearchTasks/task-filter/task-filter.component';
import { ReportFilterComponent } from './SearchPages/SearchReports/report-filter/report-filter.component';
import { BanFilterComponent } from './SearchPages/SearchBans/ban-filter/ban-filter.component';
import { BoardFilterComponent } from './SearchPages/SearchBoards/board-filter/board-filter.component';
import { SearchBoardPageComponent } from './SearchPages/SearchBoards/search-board-page/search-board-page.component';
import { TasksPageComponent } from './UserPages/TasksPage/tasks-page/tasks-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownComponent,
    SearchBarComponent,
    CreateBoardComponent,
    CreateTaskComponent,
    CreateTeamComponent,
    SearchBoardPageComponent,
    SearchUsersPageComponent,
    SearchTasksPageComponent,
    SearchPollsPageComponent,
    SearchDiscussionsPageComponent,
    SearchReportsPageComponent,
    SearchBanPageComponent,
    BoardFilterComponent,
    UserFilterComponent,
    TaskFilterComponent,
    PollFilterComponent,
    DiscussionFilterComponent,
    ReportFilterComponent,
    DropdownComponent,
    BanFilterComponent,
    CreateCommentComponent,
    CreateReportComponent,
    CreateDiscussionComponent,
    CreatePollComponent,
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
    PollOptionsComponent,
    BanCardComponent,
    UserPageComponent,
    UserDetailsComponent,
    DiscussionPageComponent,
    PollPageComponent,
    DiscussionDetailsComponent,
    DiscussionOptionsComponent,
    PollDetailsComponent,
    PollOptionComponent,
    TextOverflowComponent,
    LikePagesComponent,
    TabPaneComponent,
    CommentCardComponent,
    DiscussionsPageComponent,
    PollsPageComponent,
    UserFilterComponent,
    UserCardComponent,
    PollFilterComponent,
    DiscussionFilterComponent,
    UnAuthorizedPageComponent,
    ManageBoardPageComponent,
    TaskElementComponent,
    TaskTagComponent,
    BoardHeaderComponent,
    OverlayComponent,
    TaskOverlayComponent,
    UserHolderComponent,
    AddUserComponent,
    CreateInviteComponent,
    CanvasComponent,
    MultiSelectionComponent,
    CreateTagComponent,
    CreateCheckListComponent,
    ChecklistComponent,
    CreateCheckListOptionComponent,
    CreateTaskImageComponent,
    BetterImageComponent,
    SearchSelectionComponent,
    ModifyUserComponent,
    CreateTaskURLComponent,
    TaskURLComponent,
    CreateTaskFileComponent,
    TaskFileComponent,
    CreatePollOptionComponent,
    BoardsPageComponent,
    BoardInvitesComponent,
    TasksPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DragDropModule,
    MatSelectModule,
    NgxEditorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    NgxColorsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080/api/v1'],
        sendAccessToken: true
      }
    }),
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        insertLink: 'Insert Link',
        removeLink: 'Remove Link',
        insertImage: 'Insert Image',
    
        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,useClass: RefreshInterceptor,multi: true,deps: [OAuthService],

  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
