import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Page, PagedModel, PaginationRequest, Poll } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-polls-page',
  templateUrl: './polls-page.component.html',
  styleUrls: ['./polls-page.component.css']
})
export class PollsPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentPolls: Poll[] = [];
  private currentUserID: any = undefined;
  public pollIcon: IconDefinition = faPoll;
  

  public isSearching: boolean = false;
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};

  constructor(private authHandler: AuthHandlerService,private pollService: PollService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
      this.currentUserID = value;
      if(this.currentUserID != undefined)
          this.searchPolls(this.currentPage.number,this.currentPage.size);
    }))
  }

  private searchPolls(page: number,pageSize: number): void {
    this.isSearching = true;
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.pollService.getPollsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentPolls = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.currentPage = value.page != undefined ? value.page : this.currentPage;
    },(err: any) => this.reset());
  }

  private reset(): void {
    this.isSearching = false;
    this.currentPolls = [];
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  }

  public handlePageChange(event: any): void {
    this.currentPage.number = event - 1;
    this.searchPolls(this.currentPage.number,this.currentPage.size);
  }

  public removePoll(poll: any): void {
    this.currentPolls = this.currentPolls.filter((value: any) => value.id !== poll.id);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
