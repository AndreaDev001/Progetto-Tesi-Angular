import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TaskLikeService {

  private url: string = "http://localhost:8080/api/v1/taskLikes";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public getTaskLikesByUser(userID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID;
    let queryParams: HttpParams = this.httpUtilsService.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }


  public createTaskLike(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }

  public getTaskLikeBetween(taskID: string,userID: string): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public deleteLike(taskLikeID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskLikeID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}

