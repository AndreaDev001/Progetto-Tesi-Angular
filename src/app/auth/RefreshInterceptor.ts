import { Injectable, inject } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

constructor(private handler: OAuthService) {

}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if(this.handler.discoveryDocumentLoaded && req.url.includes("http://localhost:8080")) {
        this.handler.refreshToken();
    }
    return next.handle(req);
  }
  private isExpired(value: any): boolean {
    return Date.now() > value * 1000;
  }
}