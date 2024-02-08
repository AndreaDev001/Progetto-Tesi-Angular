import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll, faUser } from '@fortawesome/free-solid-svg-icons';
import { Poll } from 'src/model/interfaces';

@Component({
  selector: 'app-poll-options',
  templateUrl: './poll-options.component.html',
  styleUrls: ['./poll-options.component.css']
})
export class PollOptionsComponent {
  public userIcon: IconDefinition = faUser;
  public pollIcon: IconDefinition = faPoll;

  public currentPublisherPolls: Poll[] = [];
  public currentSimilarPolls: Poll[] = [];
}
