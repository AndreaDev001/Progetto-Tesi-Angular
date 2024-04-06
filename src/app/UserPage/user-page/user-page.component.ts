import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/model/interfaces';
import { UserServiceService } from 'src/model/services/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = [];
  public currentUserID: string | undefined = undefined;
  public currentUser: User | undefined = undefined;
  public isSearching: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,private userService: UserServiceService) {

  }

  public ngOnInit(): void {
    this.createSubscriptions();
  }

  private createSubscriptions(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      this.currentUserID = value.id;
      if(this.currentUserID != undefined)
          this.searchUser(this.currentUserID);
    }))
  }

  private searchUser(userID: any): void {
    this.isSearching = true;
    this.userService.getUserDetails(userID).subscribe((value: User) => {
      this.isSearching = false;
      this.currentUser = value;
    },(err: any) => this.isSearching = false);
  }

  public ngOnDestroy(): void {
      this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }
}
