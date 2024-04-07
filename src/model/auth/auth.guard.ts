import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHandlerService } from './auth-handler.service';
import { OAuthService } from 'angular-oauth2-oidc';

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean => {
  let authHandler: any = inject(OAuthService);
  let router: any = inject(Router);
  if(authHandler.hasValidAccessToken())
      return true;
  else
  {
    router.navigate(["unauthorized"]);
    return false;
  }
}