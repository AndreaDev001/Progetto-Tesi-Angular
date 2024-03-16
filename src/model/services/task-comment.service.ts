import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { CreateComment } from '../create';
import { UpdateComment } from '../update';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  private url: string = "http://localhost:8080/api/v1/taskComments";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getCommentsByTask(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
  
  public createComment(createComment: CreateComment,taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createComment,{params: queryParams});
  }
  public deleteComment(commentID: string): any {
    const desiredURL: string = this.url + "/private/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
