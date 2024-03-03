import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/interfaces';
import { UserRef } from 'src/model/refs';

@Component({
  selector: 'app-user-holder',
  templateUrl: './user-holder.component.html',
  styleUrls: ['./user-holder.component.css']
})
export class UserHolderComponent implements OnInit {
  
  @Input() user: User | undefined = undefined;
  @Input() imageWidth: number = 60;
  @Input() imageHeight: number = 60;
  @Input() userRef: UserRef | undefined = undefined;
  @Input() showNameInfo: boolean = true;

  public ngOnInit(): void {
    if(this.userRef != undefined)
        this.user = {id: this.userRef.id,username: this.userRef.username,name: this.userRef.name,surname: this.userRef.surname,createdDate: this.userRef.createdDate,amountOfAssignedTasks: 0,amountOfCreatedBans: 0,amountOfCreatedBoards: 0,amountOfCreatedDiscussions: 0,amountOfCreatedLikes: 0,amountOfCreatedPolls: 0,amountOfCreatedReports: 0,amountOfCreatedTags: 0,amountOfCreatedRoles: 0,amountOfCreatedTasks: 0,amountOfCreatedVotes: 0,amountOfJoinedBoards: 0,amountOfOwnedRoles: 0,amountOfReceivedBans: 0,amountOfReceivedReports: 0};
  }
}
