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

  public getBoardMembersByBoard(boardID: any): any {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + boardID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
  
  public getPossibleTaskMembers(boardID: string,taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/possible/task" + "/board" + "/" + boardID + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getPossibleTeamMembers(boardID: string,teamID: string): any {
    const desiredURL: string = this.url + "/private" + "/possible/team/board" + "/" + boardID + "/team/" + teamID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getBoardMembersByMember(memberID: any,page: PaginationRequest): any{
    const desiredURL: string = this.url + "/private" + "/user" + "/" + memberID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public deleteMember(memberID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + memberID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
  
  public deleteMemberFromBoard(boardID: string,userID: string): any {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + boardID + "/user" + "/" + userID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
