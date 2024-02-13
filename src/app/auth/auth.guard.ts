import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHandlerService } from './auth-handler.service';

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean => {
  return inject(AuthHandlerService).isAuthenticated(true);
}