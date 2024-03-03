import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTagAssignment } from 'src/model/create';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TagAssignmentService {

  private url: string = "http://localhost:8080/api/v1/tagAssignments";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getTagAssignments(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createTagAssignment(createTagAssignment: CreateTagAssignment): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createTagAssignment,{params: queryParams});
  }
}
