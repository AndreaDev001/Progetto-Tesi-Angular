import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url: string = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient,private HttpUtilsService: HttpUtilsService) {

  }

  public getUserDetails(userID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + userID;
    console.log(desiredURL);
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});    
  }
}
