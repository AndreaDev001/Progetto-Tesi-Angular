import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TextOverflowItem } from 'src/app/Utility/components/text-overflow/text-overflow.component';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Board, BoardMember, PagedModel, PaginationRequest } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.css']
})
export class BoardsPageComponent implements OnInit,OnDestroy 
{
    private subscriptions: Subscription[] = [];
    private currentUserID: any = undefined;
    public boardIcon: IconDefinition = faTable;

    public currentBoardMembers: BoardMember[] = [];
    public isSearching: boolean = false;
    private currentPage: number = 0;
    private currentTotalPages: number = 0;
    
    constructor(private boardMemberService: BoardMemberService,private authHandler: AuthHandlerService) {

    }

    public ngOnInit(): void {
      this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
        this.currentUserID = value;
        this.searchBoardMembers(0,20);
      }))
    }

    private searchBoardMembers(page: number,pageSize: number): void {
      this.isSearching = true;
      let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
      this.boardMemberService.getBoardMembersByMember(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentBoardMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        if(value.page != undefined) {
          this.currentPage = value.page.page;
          this.currentTotalPages = value.page.totalPages;
        }
      },(err: any) => this.reset());
    }

    private reset(): void {
      this.isSearching = false;
      this.currentBoardMembers = [];
      this.currentPage = 0;
      this.currentTotalPages = 0;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
    }
}
