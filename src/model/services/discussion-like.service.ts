import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionLikeService {

  private url: string = "http://localhost:8080/api/v1/discussionLikes";

  constructor(private httpClient: HttpClient,private HttpUtils: HttpUtilsService) {

  }

  public getLikeBetween(discussionID: string,userID: string): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID + "/discussion" + "/" + discussionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getDiscussionLikesByUser(userID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID;
    let queryParams: HttpParams = this.HttpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createDiscussionLike(discussionID: string): any {
      const desiredURL: string = this.url + "/private" + "/discussion" + "/" + discussionID;
      let queryParams: HttpParams = new HttpParams();
      return this.httpClient.post(desiredURL,{params: queryParams});
  }
  public deleteDiscussionLike(discussionLikeID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + discussionLikeID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
