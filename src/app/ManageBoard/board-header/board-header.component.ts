import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faGear, faHeart, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.css']
})
export class BoardHeaderComponent {
  public likeIcon: IconDefinition = faHeart;
  public teamsIcon: IconDefinition = faUserGroup;
  public inviteIcon: IconDefinition = faMessage;
  public optionIcon: IconDefinition = faGear;
}
