import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class PollLikeService {

  private url: string = "http://localhost:8080/api/v1/pollLikes";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public getPollLikesByUser(userID: string,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID;
    let queryParams: HttpParams = this.httpUtilsService.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getLikeBetween(pollID: string,userID: string): any {
    const desiredURL: string = this.url + "/private" + "/poll" + "/" + pollID + "/user" + "/" + userID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createLike(pollID: string): any {
    const desiredURL: string = this.url + "/private" + "/poll" + "/" + pollID;;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }
  
  public deleteLike(pollLikeID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + pollLikeID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
