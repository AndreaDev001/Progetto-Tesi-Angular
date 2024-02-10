import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { PagedModel, PaginationRequest, Poll } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-polls-page',
  templateUrl: './polls-page.component.html',
  styleUrls: ['./polls-page.component.css']
})
export class PollsPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];

  public publisherID: any = undefined;
  public currentPolls: Poll[] = [];
  private currentPage: number = 0;
  private currentTotalPages: number = 0;
  public currentTotalElements: number = 0;
  public pollIcon: IconDefinition = faPoll;
  
  constructor(private activatedRoute: ActivatedRoute,private pollsService: PollService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.updateCurrentPolls(this.currentPage,20);
      }
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value :Subscription) => value.unsubscribe());  
  }

  public updateCurrentPolls(page: number,pageSize: number): void {
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.pollsService.getPollsByPublisher(this.publisherID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentPolls = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
        this.currentTotalElements = value.page.totalElements;
      }
    }) 
  }

  public resetSearch(): void {
    this.currentPage = 0;
    this.updateCurrentPolls(this.currentPage,20);
  }

  public handlePageChange(page: any): void {
    if(page < this.currentTotalPages) {
      this.currentPage = page;
      this.updateCurrentPolls(this.currentPage,20);
    }
  }
}
