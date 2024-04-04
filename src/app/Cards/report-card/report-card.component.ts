import { Component,EventEmitter,Input, OnInit, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faWarning } from '@fortawesome/free-solid-svg-icons';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { Report } from 'src/model/interfaces';
import { ReportService } from 'src/model/services/report.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent  {
  @Input() public report: Report | undefined = undefined;
  @Output() banEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  public warningIcon: IconDefinition = faWarning;
  public calendarIcon: IconDefinition = faCalendarDays;

  @ViewChild("createBanTemplate") createBanTemplate: any;

  constructor(public alertHandlerService: AlertHandlerService,private reportService: ReportService) {

  }

  public createBan(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createBanTemplate);
    this.alertHandlerService.open();
  }

  public deleteReport(): void {
    if(this.report != undefined) {
      this.reportService.deleteReport(this.report.id).subscribe((value: any) => {
        this.deleteEvent.emit();
      })
    }
  }
}
