import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TextOverflowItem } from 'src/app/Utility/components/text-overflow/text-overflow.component';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Board, BoardMember, Page, PagedModel, PaginationRequest } from 'src/model/interfaces';
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
    public currentPage: Page = {number: 0,size: 20,totalElements: 0,totalPages: 0};
    
    constructor(private boardMemberService: BoardMemberService,private authHandler: AuthHandlerService) {

    }

    public ngOnInit(): void {
      this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
        this.currentUserID = value;
        if(this.currentUserID != undefined)
            this.searchBoardMembers(this.currentPage.number,this.currentPage.size);
      }))
    }

    private searchBoardMembers(page: number,pageSize: number): void {
      this.isSearching = true;
      let paginationRequest: PaginationRequest = {page: page,pageSize: pageSize};
      this.boardMemberService.getBoardMembersByMember(this.currentUserID,paginationRequest).subscribe((value: PagedModel) => {
        this.isSearching = false;
        this.currentBoardMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentPage = value.page != undefined ? value.page : this.currentPage;
      },(err: any) => this.reset());
    }

    public handlePageChange(event: any): void {
      this.currentPage.number = event - 1;
      this.searchBoardMembers(this.currentPage.number,this.currentPage.size);
    }

    private reset(): void {
      this.isSearching = false;
      this.currentBoardMembers = [];
      this.currentPage = {number: 0,size: 20,totalElements: 20,totalPages: 20};
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
    }
}
