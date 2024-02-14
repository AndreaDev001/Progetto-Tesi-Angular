import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TaskGroupService {

  private url: string = "http://localhost:8080/api/v1/taskGroups";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getTaskGroupById(id: any): any {
    const desiredURL: string = this.url + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTaskGroupsByBoard(id: any): any {
    const desiredURL: string = this.url + "/board" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
