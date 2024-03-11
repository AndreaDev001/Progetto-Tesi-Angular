import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { Filter } from 'src/app/SearchPages/UserPage/user-filter/user-filter.component';
import { PaginationRequest } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) { 

  }

  public getUser(id: string): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getUsersByUsername(username: string,paginationRequest: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/username" + "/" + username + "/like";
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(paginationRequest);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getPossibleBoardUsers(context: any,username: string,boardID: string,paginationRequest: PaginationRequest): any {
    const desiredURL: string = context.url + "/private" + "/possible" + "/board" + "/" + boardID + "/user" + "/" + username;
    let queryParams: HttpParams = context.httpUtils.generatePaginationParams(paginationRequest);
    return context.httpClient.get(desiredURL,{params: queryParams})
  }

  public getUsersBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec"
    let queryParams: HttpParams = this.httpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
  public getGenders(): any {
    const desiredURL: string = this.url + "/public" + "/genders"
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}

