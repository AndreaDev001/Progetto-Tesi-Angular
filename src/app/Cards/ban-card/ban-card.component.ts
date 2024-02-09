import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBan, faClockFour } from '@fortawesome/free-solid-svg-icons';
import { Ban } from 'src/model/interfaces';

@Component({
  selector: 'app-ban-card',
  templateUrl: './ban-card.component.html',
  styleUrls: ['./ban-card.component.css']
})
export class BanCardComponent {
  @Input() ban: Ban | undefined = undefined;
  public banIcon: IconDefinition = faBan;
  public clockIcon: IconDefinition = faClockFour;
  public calendarIcon: IconDefinition = faCalendarDays;
}
