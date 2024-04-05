import { Component, OnInit,Input, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Discussion, Page, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';

@Component({
  selector: 'app-discussions-page',
  templateUrl: './discussions-page.component.html',
  styleUrls: ['./discussions-page.component.css']
})
export class DiscussionsPageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private currentUserID: any = undefined;
  public discussionIcon: IconDefinition = faDiscourse;

  public currentDiscussions: Discussion[] = [];
  public isSearching: boolean = false;
  public currentPage: Page = {number: 0,size: 1,totalElements: 0,totalPages: 0};


  constructor(private discussionService: DiscussionService,private authHandler: AuthHandlerService) {


  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
        this.currentUserID = value;
        if(this.currentUserID != undefined)
            this.searchDiscussions(this.currentPage.number,this.currentPage.size);
    }));
  }

  public handlePageChange(event: any): void {
    this.currentPage.number = event - 1;
    this.searchDiscussions(this.currentPage.number,this.currentPage.size);
  }

  public searchDiscussions(page: number,pageSize: number): void {
    this.isSearching = true;
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.discussionService.getDiscussionsByPublisher(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentDiscussions = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.currentPage = value.page != undefined ? value.page : this.currentPage;
    },(err: any) => this.reset());
  }

  public reset(): void {
    this.isSearching = false;
    this.currentDiscussions = [];
    this.currentPage = {number: 0,size: 0,totalElements: 0,totalPages: 0};
  }

  public removeDiscussion(discussion: Discussion): void {
    this.currentDiscussions = this.currentDiscussions.filter((value: Discussion) => value.id !== discussion.id);
  }


  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
