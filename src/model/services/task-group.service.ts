import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { UpdateTaskGroup } from 'src/model/update';
import { CreateTaskGroup } from '../create';

@Injectable({
  providedIn: 'root'
})
export class TaskGroupService {

  private url: string = "http://localhost:8080/api/v1/taskGroups";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public deleteTaskGroup(id: string): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }

  public clearTaskGroup(id: string): any {
    const desiredURL: string = this.url + "/private" + "/clear" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }

  public createTaskGroup(createTaskGroup: CreateTaskGroup): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createTaskGroup,{params: queryParams});
  }

  public updateTaskGroup(updateTaskGroup: UpdateTaskGroup): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updateTaskGroup,{params: queryParams});
  }

  public getTaskGroupById(id: any): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTaskGroupsByBoard(id: any): any {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
