import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDay, faCalendarDays, faEnvelopeOpen, faMailForward, faUserGraduate, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { BoardInvite } from 'src/model/interfaces';
import { BoardInviteService } from 'src/model/services/board-invite.service';
import { UpdateBoardInvite } from 'src/model/update';

@Component({
  selector: 'app-board-invite-card',
  templateUrl: './board-invite-card.component.html',
  styleUrls: ['./board-invite-card.component.css']
})
export class BoardInviteCardComponent {
  @Input() boardInvite: BoardInvite | undefined = undefined;
  public inviteIcon: IconDefinition = faEnvelopeOpen;
  public membersIcon: IconDefinition = faUserGroup;
  public calendarIcon: IconDefinition = faCalendarDays;

  constructor(private boardInviteService: BoardInviteService,private router: Router) {

  }

  public acceptInvite(): void {
    if(this.boardInvite != undefined && this.boardInvite.board != undefined) {
      let updateBoardInvite: UpdateBoardInvite = {inviteID: this.boardInvite.id,status: "ACCEPTED"};
      this.boardInviteService.updateInvite(updateBoardInvite).subscribe((value: any) => {
        this.boardInvite = value;
        this.router.navigateByUrl("/board" + "/" + this.boardInvite!!.board.id);
      })
    }
  }

  public rejectInvite(): void {
    if(this.boardInvite != undefined && this.boardInvite.board != undefined) {
      let updateBoardInvite: UpdateBoardInvite = {inviteID: this.boardInvite.id,status: "REJECTED"};
      this.boardInviteService.updateInvite(updateBoardInvite).subscribe((value: any) => {
        this.boardInvite = value;
      })
    }
  }

  public openBoard(): void {
    this.router.navigateByUrl("/board" + "/" + this.boardInvite!!.board.id);
  }
}
