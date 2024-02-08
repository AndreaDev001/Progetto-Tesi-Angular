import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faMedal } from '@fortawesome/free-solid-svg-icons';
import { PollOption } from 'src/model/interfaces';

@Component({
  selector: 'app-poll-option',
  templateUrl: './poll-option.component.html',
  styleUrls: ['./poll-option.component.css']
})
export class PollOptionComponent {
  @Input() pollOption: PollOption | undefined = undefined;
  public optionIcon: IconDefinition = faCheckToSlot;
  public medalIcon: IconDefinition = faMedal;
}
