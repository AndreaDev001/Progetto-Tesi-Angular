import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationRequest } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BoardInviteService {

  private url: string = "http://localhost:8080/api/v1/boardInvites";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getStatues(): any {
    const desiredURL: string = this.url + "/public/" + "statues";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getInvitesByUser(userID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private/receiver/" + userID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
