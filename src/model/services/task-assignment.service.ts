import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { createTaskAssignment } from '../create';

@Injectable({
  providedIn: 'root'
})
export class TaskAssignmentService {

  private url: string = "http://localhost:8080/api/v1/taskAssignments";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getTaskAssignmentsByUser(userID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTaskAssignmentsByBoard(boardID: any): any {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + boardID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTaskAssignmentsByTask(taskID: any): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public hasAssignment(userID: any,taskID: any) {
    const desiredURL: string = this.url + "/private" + "/user" + "/" + userID + "/task" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createTaskAssignment(createTaskAssignment: createTaskAssignment): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createTaskAssignment,{params: queryParams});
  }

  public createTaskAssignmentFromTeam(taskID: string,teamID: string) {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID + "/team" + "/" + teamID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }

  public deleteTaskAssignment(taskAssignmentID: any): any {
    const desiredURL: string = this.url + "/private" + "/" + taskAssignmentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
