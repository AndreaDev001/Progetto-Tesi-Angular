import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Poll } from 'src/model/interfaces';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent {
  @Input() poll: Poll | undefined = undefined;
  public calendarIcon: IconDefinition = faCalendar;
  public likeIcon: IconDefinition = faHeart;
}
