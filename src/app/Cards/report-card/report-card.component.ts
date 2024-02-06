import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent {
  public warningIcon: IconDefinition = faWarning;
  public calendarIcon: IconDefinition = faCalendarDays;
}
