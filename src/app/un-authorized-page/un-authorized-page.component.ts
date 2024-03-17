import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { AuthHandlerService } from '../../model/auth/auth-handler.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-un-authorized-page',
  templateUrl: './un-authorized-page.component.html',
  styleUrls: ['./un-authorized-page.component.css']
})
export class UnAuthorizedPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public errorIcon: IconDefinition = faWarning;

  constructor(private authHandler: AuthHandlerService,private router: Router) {

  }

  public ngOnInit(): void {
    this.authHandler.isAuthenticated(false).subscribe((value: any) => {
      if(value)
          this.router.navigate(['home']);
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public performLogin(): void {
    this.authHandler.performLogin();
  }
}
