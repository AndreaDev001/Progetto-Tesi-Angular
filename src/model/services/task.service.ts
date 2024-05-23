import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { Filter } from 'src/app/SearchPages/SearchTasks/task-filter/task-filter.component';
import { UpdateTask } from '../update';
import { CreateTask } from '../create';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = "http://localhost:8080/api/v1/tasks";

  constructor(private httpClient: HttpClient,private HttpUtils: HttpUtilsService) {

  }

  public getTaskByID(id: string): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createTask(createTask: CreateTask): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createTask,{params: queryParams});
  }

  public updateTask(updateTask: UpdateTask): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updateTask,{params: queryParams});
  }

  public getPriorities(): any {
    const desiredURL: string = this.url + "/public/" + "priorities";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTasksByGroup(id: string): any {
    const desiredURL: string = this.url + "/private" + "/group" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams})
  }

  public getTasksBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec";
    let queryParams: HttpParams = this.HttpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public deleteTask(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams})
  }
}
