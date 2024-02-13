import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc'
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/model/interfaces';
import { UserService } from 'src/model/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  private authenticationConfiguration: AuthConfig = {
    issuer: "http://localhost:9000",
    redirectUri: window.location.origin + "/home",
    clientId: 'client',
    dummyClientSecret: 'secret',
    responseType: "code",
    scope: 'openid',
    showDebugInformation: true
  }

  private currentUserID: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private currentConfiguration: BehaviorSubject<AuthConfig> = new BehaviorSubject(this.authenticationConfiguration);
  private currentAccessToken: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentRefreshToken: BehaviorSubject<any> = new BehaviorSubject(undefined);


  constructor(private oauthService: OAuthService,private userService: UserService,private router: Router) {
    if(this.oauthService.getAccessToken() != undefined) {
      let accessToken: string = this.oauthService.getAccessToken();
      this.currentAccessToken.next(accessToken);
      this.readUserInfo(accessToken);
    }
    if(this.oauthService.getRefreshToken != undefined)
        this.currentRefreshToken.next(this.oauthService.getRefreshToken());
    
    this.oauthService.configure(this.authenticationConfiguration);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public performLogin(): void {
    this.oauthService.initCodeFlow();
  }

  private readUserInfo(token: string): void {
    let decodedJWT: any = JSON.parse(window.atob(token.split('.')[1]));
    let userID: string = decodedJWT.sub;
    this.currentUserID.next(userID);
    if(userID != undefined) {
      this.authenticated.next(true);
      this.userService.getUser(userID).subscribe((value: any) => {
        this.currentUser.next(value);
      })
    }
  }

  private isExpired(token: string): boolean {
    let decodedJWT: any = JSON.parse(window.atob(token.split('.')[1]));
    let expiration: any = decodedJWT.exp * 1000;
    return Date.now() < expiration;
  }

  public getCurrentUserID(value: boolean): any {return value ? this.currentUserID.value : this.currentUserID};
  public getCurrentUser(value: boolean): any {return value ? this.currentUser.value : this.currentUser};
  public isAuthenticated(value: boolean): any {return value ? this.authenticated.value : this.authenticated};
  public getCurrentConfiguration(value: boolean): any {return value ? this.currentConfiguration.value : this.currentConfiguration};
  public getCurrentAccessToken(value: boolean): any {return value ? this.currentAccessToken.value : this.currentAccessToken};
  public getCurrentRefreshToken(value: boolean): any {return value ? this.currentRefreshToken.value : this.currentRefreshToken};
}
