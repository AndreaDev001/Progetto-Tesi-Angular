import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TaskAssigmentService {

  private url: string = "http://localhost:8080/api/v1/taskAssignments";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getTaskAssigmentsByUser(id: any,paginationRequest: PaginationRequest): any {
    const desiredURL: string = this.url + "/private/user/" + id;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(paginationRequest);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
