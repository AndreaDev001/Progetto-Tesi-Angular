import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { BoardInvite, Page, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { BoardInviteService } from 'src/model/services/board-invite.service';

@Component({
  selector: 'app-board-invites',
  templateUrl: './board-invites.component.html',
  styleUrls: ['./board-invites.component.css']
})
export class BoardInvitesComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  private currentUserID: any = undefined;
  public inviteIcon: IconDefinition = faMessage;

  public currentInvites: BoardInvite[] = [];
  public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  public isSearching: boolean = false;

  constructor(private boardInvites: BoardInviteService,private authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
      this.currentUserID = value;
      this.searchInvites(this.currentPage.number,this.currentPage.size);
    }));
  }

  private searchInvites(page: number,pageSize: number): void {
    this.isSearching = true;
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.boardInvites.getInvitesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.currentInvites = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.currentPage = value.page != undefined ? value.page : this.currentPage;
      this.isSearching = false;
    },(err: any) => this.reset());
  }

  private reset(): void {
    this.isSearching = false;
    this.currentInvites = [];
    this.currentPage = {number: 0,size: 20,totalElements: 0,totalPages: 0};
  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
