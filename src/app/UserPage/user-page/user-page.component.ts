import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/model/interfaces';
import { UserServiceService } from 'src/model/services/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public currentUserID: string | undefined = undefined;
  public currentUser: User | undefined = undefined;
  public isSearching: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,private userService: UserServiceService) {

  }

  public ngOnInit(): void {
    this.isSearching = true;
    this.activatedRoute.params.subscribe((value: any) => {
      this.currentUserID = value.id;
      if(this.currentUserID != undefined) {
        this.userService.getUserDetails(this.currentUserID).subscribe((value: User) => {
          this.currentUser = value;
        })
      }
      this.isSearching = false;
    })
  }
}
