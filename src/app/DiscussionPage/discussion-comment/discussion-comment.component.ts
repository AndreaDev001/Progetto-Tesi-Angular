import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-discussion-comment',
  templateUrl: './discussion-comment.component.html',
  styleUrls: ['./discussion-comment.component.css']
})
export class DiscussionCommentComponent {

  @Input() comment: Comment | undefined = undefined;
  public userIcon: IconDefinition = faUser;
  public calendarIcon: IconDefinition = faCalendar;
  public likeIcon: IconDefinition = faHeart;

}
