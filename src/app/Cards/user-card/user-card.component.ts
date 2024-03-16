import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthHandlerService } from 'src/app/auth/auth-handler.service';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { User } from 'src/model/interfaces';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User | undefined = undefined;
  public canReport: boolean = false;

  @ViewChild("addReportTemplate") reportTemplate: any;

  constructor(public alertHandler: AlertHandlerService,public authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {
    this.canReport = this.authHandler.getCurrentUserID(true) != this.user?.id;
  }

  public createReport(): any {
    this.alertHandler.reset();
    this.alertHandler.setTextTemplate(this.reportTemplate);
    this.alertHandler.open();
  }
}
