import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDay, faCalendarDays, faEnvelopeOpen, faMailForward, faUserGraduate, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { BoardInvite } from 'src/model/interfaces';

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
}
