import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faComment, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Discussion } from 'src/model/interfaces';

@Component({
  selector: 'app-discussion-card',
  templateUrl: './discussion-card.component.html',
  styleUrls: ['./discussion-card.component.css']
})
export class DiscussionCardComponent {
  @Input() discussion: Discussion | undefined = undefined;
  public likeIcon: IconDefinition = faHeart;
  public commentIcon: IconDefinition = faComment;
  public chatIcon: IconDefinition = faMessage;
}
