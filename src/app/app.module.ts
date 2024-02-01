import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardPageComponent } from './BoardPage/board-page/board-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BoardFilterComponent } from './BoardPage/board-filter/board-filter.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { BanFilterComponent } from './ban-filter/ban-filter.component';

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
    BanFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
