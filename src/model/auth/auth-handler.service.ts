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
    redirectUri: window.location.origin + "/unauthorized",
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
    this.oauthService.configure(this.authenticationConfiguration);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      let accessToken: string = this.oauthService.getAccessToken();
      let refreshToken: string = this.oauthService.getRefreshToken();
      if(accessToken != undefined && !this.isExpired(accessToken))
      {
        this.readUserInfo(accessToken);
        this.currentAccessToken.next(accessToken);
        this.currentRefreshToken.next(refreshToken);
        this.authenticated.next(true);
      }
      else
      { 
        this.reset();
      }
    })
  }

  private reset(): void {
    this.authenticated.next(false);
    this.currentUserID.next(undefined);
    this.currentUser.next(undefined);
    this.currentAccessToken.next(undefined);
    this.currentRefreshToken.next(undefined);
    this.router.navigate(['unauthorized']);
  }

  public isExpired(token: string): boolean {
    let decodedJWT: any = JSON.parse(window.atob(token.split('.')[1]));
    let expirationDate: any = decodedJWT.exp * 1000;
    return Date.now() > expirationDate
  }

  public isAdmin(): boolean {
    if(this.currentAccessToken.value == undefined)
        return false;
    let decodedJWT: any = JSON.parse(window.atob(this.currentAccessToken.value.split('.')[1]));
    return true;
  }

  public refreshToken(): void {
    if(this.oauthService.getRefreshToken() != undefined) {
      this.oauthService.refreshToken().then(() => {
        let accessToken: string = this.oauthService.getAccessToken();
        let refreshToken: string = this.oauthService.getRefreshToken();
        this.currentAccessToken.next(accessToken);
        this.currentRefreshToken.next(refreshToken);
      })
    }
  }

  public refreshUserInfo(): void {
    this.readUserInfo(this.currentAccessToken.value);
  }

  public async performLogin() {
    await this.oauthService.initCodeFlow();
  }


  private readUserInfo(token: string): void {
    let decodedJWT: any = JSON.parse(window.atob(token.split('.')[1]));
    let userID: string = decodedJWT.sub;
    this.currentUserID.next(userID);
    if(userID != undefined) {
      this.userService.getUser(userID).subscribe((value: any) => {
        this.currentUser.next(value);
      })
    }
  }
  public getCurrentUserID(value: boolean): any {return value ? this.currentUserID.value : this.currentUserID};
  public getCurrentUser(value: boolean): any {return value ? this.currentUser.value : this.currentUser};
  public isAuthenticated(value: boolean): any {return value ? this.authenticated.value : this.authenticated};
  public getCurrentConfiguration(value: boolean): any {return value ? this.currentConfiguration.value : this.currentConfiguration};
  public getCurrentAccessToken(value: boolean): any {return value ? this.currentAccessToken.value : this.currentAccessToken};
  public getCurrentRefreshToken(value: boolean): any {return value ? this.currentRefreshToken.value : this.currentRefreshToken};
}
