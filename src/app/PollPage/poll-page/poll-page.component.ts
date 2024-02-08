import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faPoll } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-poll-page',
  templateUrl: './poll-page.component.html',
  styleUrls: ['./poll-page.component.css']
})
export class PollPageComponent {
  public pollIcon: IconDefinition = faPoll;
  public optionIcon: IconDefinition = faCheckToSlot;
}
