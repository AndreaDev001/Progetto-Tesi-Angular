import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardPageComponent } from './BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './TaskPage/tasks-page/tasks-page.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BoardFilterComponent } from './BoardPage/board-filter/board-filter.component';
import { TaskFilterComponent } from './TaskPage/task-filter/task-filter.component';
import { ReportFilterComponent } from './ReportPage/report-filter/report-filter.component';
import { BanFilterComponent } from './BanPage/ban-filter/ban-filter.component';
import { ReportPageComponent } from './ReportPage/report-page/report-page.component';
import { BanPageComponent } from './BanPage/ban-page/ban-page.component';
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
import { AlertComponentComponent } from './alert-component/alert-component.component';
import { NoItemsComponent } from './no-items/no-items.component';
import { LoaderComponent } from './loader/loader.component';
import { OffCanvasComponent } from './off-canvas/off-canvas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './pagination/pagination.component';

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
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
