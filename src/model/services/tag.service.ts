import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { CreateTag } from '../create';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url: string = "http://localhost:8080/api/v1/tags";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getTagsByBoard(boardID: string): any {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + boardID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createTag(createTag: CreateTag): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createTag,{params: queryParams});
  }
}
