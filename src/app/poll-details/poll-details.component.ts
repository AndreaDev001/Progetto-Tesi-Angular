import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent {
  public calendarIcon: IconDefinition = faCalendar;
  public likeIcon: IconDefinition = faHeart;
}
