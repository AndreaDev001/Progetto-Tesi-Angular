import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc'

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  authenticationConfiguration: AuthConfig = {
    issuer: "http://localhost:9000",
    redirectUri: window.location.origin + "/home",
    clientId: 'client',
    dummyClientSecret: 'secret',
    responseType: "code",
    scope: 'openid',
    showDebugInformation: true
  }

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(this.authenticationConfiguration);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public peformLogin(): void {
    this.oauthService.initCodeFlow();
  }

  public getAccessToken(): void {
    console.log(this.oauthService.getAccessToken());
  }
}
