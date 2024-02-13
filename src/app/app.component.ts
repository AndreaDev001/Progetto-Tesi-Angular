import { Component, OnInit } from '@angular/core';
import { AuthHandlerService } from './auth-handler.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Progetto-Tirocinio-Angular';

  constructor(private authorizationHandler: AuthHandlerService) {

  }

  public ngOnInit(): void {

  }
  public performLogin(): void {

  }
}
