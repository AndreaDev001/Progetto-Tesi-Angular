import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url: string = "http://localhost:8080/api/v1/comments";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getCommentsByPublisher(publisher: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/publisher" + "/" + publisher;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getCommentsByDiscussion(discussion: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/discussion" + "/" + discussion;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
