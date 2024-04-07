import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { User } from 'src/model/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: User | undefined = undefined;
  public canReport: boolean = false;

  @ViewChild("addReportTemplate") reportTemplate: any;

  constructor(public alertHandler: AlertHandlerService,public authHandler: AuthHandlerService,private router: Router) {

  }

  public ngOnInit(): void {
    this.canReport = this.authHandler.getCurrentUserID(true) != this.user?.id;
  }

  public visitProfile(): void {
    this.router.navigateByUrl('user/' + this.user?.id);
  }

  public createReport(): any {
    this.alertHandler.reset();
    this.alertHandler.setTextTemplate(this.reportTemplate);
    this.alertHandler.open();
  }
}
