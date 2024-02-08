import { Component,Input} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Discussion } from 'src/model/interfaces';

@Component({
  selector: 'app-discussion-details',
  templateUrl: './discussion-details.component.html',
  styleUrls: ['./discussion-details.component.css']
})
export class DiscussionDetailsComponent {
  @Input() discussion: Discussion | undefined = undefined;
  public discussionIcon: IconDefinition = faMessage;
  public calendarIcon: IconDefinition = faCalendar;
  public heartIcon: IconDefinition = faHeart;
}
