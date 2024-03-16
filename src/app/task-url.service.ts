import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskURL } from 'src/model/create';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TaskURLService {

  private url: string = "http://localhost:8080/api/v1/taskURLS";

  constructor(private httpClient : HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public getTaskURLSByTask(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createTaskURL(createTaskURL: CreateTaskURL): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createTaskURL,{params: queryParams});
  }
  
  public deleteTaskURL(taskURLId: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskURLId;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
