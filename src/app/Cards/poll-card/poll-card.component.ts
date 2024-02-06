import { Component, Input } from '@angular/core';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faHeart, faPoll } from '@fortawesome/free-solid-svg-icons';
import { Poll } from 'src/model/interfaces';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css']
})
export class PollCardComponent {
  @Input() poll: Poll | undefined = undefined;
  public pollIcon: IconDefinition = faPoll;
  public likeIcon: IconDefinition = faHeart;
  public minVoteIcon: IconDefinition = faCheckToSlot;
  public maxVoteIcon: IconDefinition = faCheckToSlot;
  
}
