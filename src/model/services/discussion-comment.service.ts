import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { CreateComment } from '../create';

@Injectable({
  providedIn: 'root'
})
export class DiscussionCommentService {

  private url: string = "http://localhost:8080/api/v1/commentDiscussions";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public getCommentsByDiscussion(discussionID: string): any {
    const desiredURL: string = this.url + "/private" + "/discussion/" + discussionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createComment(createComment: CreateComment,discussionID: string): any {
    const desiredURL: string = this.url + "/private" + "/discussion/" + discussionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createComment,{params: queryParams})
  }

  public deleteComment(commentID: string): any {
    const desiredURL: string = this.url + "/private/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
