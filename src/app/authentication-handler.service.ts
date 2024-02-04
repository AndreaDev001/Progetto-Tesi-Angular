import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHandlerService {

  private currentUserID: BehaviorSubject<any> = new BehaviorSubject(undefined);
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor() {

  }

  public getCurrentUserID(value: boolean): any {return value ? this.currentUserID.value : this.currentUserID};
  public getCurrentUser(value: boolean): any {return value ? this.currentUser.value : this.currentUser};
}
