import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationRequest } from '../interfaces';
import { UpdateBoardInvite } from '../update';
import { query } from 'express';

export interface CreateBoardInvite
{
    userID: string,
    boardID: string,
    text: string,
    expirationDate: string
}
@Injectable({
  providedIn: 'root'
})
export class BoardInviteService {

  private url: string = "http://localhost:8080/api/v1/boardInvites";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public createBoardInvite(createBoardInvite: CreateBoardInvite): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createBoardInvite,{params: queryParams});
  }
  public getStatues(): any {
    const desiredURL: string = this.url + "/public/" + "statues";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public updateInvite(updateInvite: UpdateBoardInvite): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updateInvite,{params: queryParams})
  }

  public getInvitesByUser(userID: any,page: PaginationRequest,context: any = undefined): any {
    context = context != undefined ? context : this;
    const desiredURL: string = context.url + "/private" + "/receiver" + "/" + userID;
    let queryParams: HttpParams = context.httpUtils.generatePaginationParams(page);
    return context.httpClient.get(desiredURL,{params: queryParams});
  }
}
