import { Component,Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Report } from 'src/model/interfaces';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent {
  @Input() public report: Report | undefined = undefined;
  public warningIcon: IconDefinition = faWarning;
  public calendarIcon: IconDefinition = faCalendarDays;
}
