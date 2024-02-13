import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page, PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class BoardMemberService {

  private url: string = "http://localhost:8080/api/v1/boardMembers";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getBoardMembersByMember(memberID: any,page: PaginationRequest): any{
    const desiredURL: string = this.url + "/private" + "/user" + "/" + memberID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
