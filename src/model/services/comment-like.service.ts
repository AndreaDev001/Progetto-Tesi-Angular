import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CommentLikeService {

  private url: string = "http://localhost:8080/api/v1/commentLikes";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getCommentLikesByUser(userID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams}); 
  }

  public hasLiked(userID: string,commentID: string): any {
    const desiredURL: string = this.url + "/private" + "/user/" + userID + "/comment/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createLike(commentID: string): any {
    const desiredURL: string = this.url + "/private" + "/comment" + "/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }

  public deleteLike(commentID: string): any {
    const desiredURL: string = this.url + "/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }

  public deleteLikeByComment(commentID: string): any {
    const desiredURL: string = this.url + "/private" + "/comment" + "/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
