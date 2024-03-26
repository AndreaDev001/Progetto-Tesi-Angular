import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { BoardInvite, PagedModel, PaginationRequest } from 'src/model/interfaces';
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
  public isSearching: boolean = false;
  private currentPage: number = 0;
  private currentTotalPages: number = 0;

  constructor(private boardInvites: BoardInviteService,private authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {
    this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
      this.currentUserID = value;
      this.searchInvites(0,20);
    })
  }

  private searchInvites(page: number,pageSize: number): void {
    this.isSearching = true;
    let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
    this.boardInvites.getInvitesByUser(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
      this.isSearching = false;
      this.currentInvites = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      if(value.page != undefined) {
        this.currentPage = value.page.page;
        this.currentTotalPages = value.page.totalPages;
      }
    },(err: any) => this.reset());
  }

  private reset(): void {
    this.isSearching = false;
    this.currentInvites = [];
    this.currentPage = 0;
    this.currentTotalPages = 0;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
