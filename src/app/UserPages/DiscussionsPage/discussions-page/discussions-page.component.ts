import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { Discussion, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { DiscussionService } from 'src/model/services/discussion.service';

@Component({
  selector: 'app-discussions-page',
  templateUrl: './discussions-page.component.html',
  styleUrls: ['./discussions-page.component.css']
})
export class DiscussionsPageComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public currentPublisherID: number = 0;
  public discussionIcon: IconDefinition = faDiscourse;
  public currentDiscussions: Discussion[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentTotalElements: number = 0;

  constructor(private discussionService: DiscussionService,private activatedRoute: ActivatedRoute) {


  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.currentPublisherID = value.id;
        this.updateCurrentDiscussions(this.currentPage,20);
      }
    }));
  }

  public updateCurrentDiscussions(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.discussionService.getDiscussionsByPublisher(this.currentPublisherID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentDiscussions = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    })
  }

  public handlePageChange(page: any): void {
      this.currentPage = page;
      this.updateCurrentDiscussions(this.currentPage,20);
  }

  public resetSearch(): void {
    this.currentPage = 0;
    this.updateCurrentDiscussions(this.currentPage,20);
  }
}
