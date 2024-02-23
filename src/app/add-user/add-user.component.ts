import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PagedModel, PaginationRequest, User } from 'src/model/interfaces';
import { UserService } from 'src/model/services/user.service';
import { TextOverflowItem } from '../Utility/text-overflow/text-overflow.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  @ViewChild("userTemplate") userTemplate: any = undefined;
  @Input() boardID: any = undefined;
  @Output() confirmedEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  public currentUsername: string | undefined = undefined;
  public currentUsers: User[] = [];
  public currentUsersItems: TextOverflowItem[] = [];
  public currentPage: number = 0;
  public currentTotalPages: number = 0;
  public currentSelectedUser: User | undefined = undefined;

  constructor(private userService: UserService)
  {

  }

  public handleChange(event: any): void 
  {
    this.currentUsername = event;
    this.updateUsers(false);
  }

  private updateUsers(page: boolean): void {
    if(!page)
        this.resetValues();
    if(this.currentUsername != undefined)
    {
      let paginationRequest: PaginationRequest = {page: this.currentPage,pageSize: 20};
      this.userService.getUsersByUsername(this.currentUsername,paginationRequest).subscribe((value: PagedModel) => {
        this.currentUsers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentUsers.forEach((current: any) => {
          let overflowItem: TextOverflowItem = {context: current,template: this.userTemplate};
          this.currentUsersItems.push(overflowItem);
        })
      })
    }
    else
      this.resetValues();
  }

  public confirmSelection(): void {
    this.confirmedEvent.emit(this.currentSelectedUser);
  }

  public cancelSelection(): void {
    this.cancelEvent.emit();
  }

  private resetValues(): void {
    this.currentUsers = [];
    this.currentUsersItems = [];
  }

  public updateMaxPage(): void {
    if(this.currentPage + 1 <= this.currentTotalPages) {
      this.currentPage = this.currentPage + 1;
      this.updateUsers(true);
    }
  }
}
