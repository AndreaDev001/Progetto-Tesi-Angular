import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { Filter } from 'src/app/SearchPages/TaskPage/task-filter/task-filter.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = "http://localhost:8080/api/v1/tasks";

  constructor(private httpClient: HttpClient,private HttpUtils: HttpUtilsService) {

  }

  public getPriorities(): any {
    const desiredURL: string = this.url + "/public/" + "priorities";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTasksBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec";
    let queryParams: HttpParams = this.HttpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
