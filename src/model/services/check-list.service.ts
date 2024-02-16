import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {
  private url: string = "http://localhost:8080/api/v1/checkLists";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getCheckListsByGroup(groupID: string): any {
    const desiredURL: string = this.url + "/private" + "/group" + "/" + groupID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
