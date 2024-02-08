import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-poll-option',
  templateUrl: './poll-option.component.html',
  styleUrls: ['./poll-option.component.css']
})
export class PollOptionComponent {
  public optionIcon: IconDefinition = faCheckToSlot;
  public medalIcon: IconDefinition = faMedal;
}
