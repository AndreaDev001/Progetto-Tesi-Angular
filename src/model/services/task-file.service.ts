import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskFile } from 'src/model/create';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TaskFileService {
  private url: string = "http://localhost:8080/api/v1/taskFiles";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public getTaskFilesByTask(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTaskFilesAsBytes(taskFileID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskFileID + "/file";
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("responseType",'blob');
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{headers: headers,params: queryParams});
  }

  public createTaskFile(createTaskFile: CreateTaskFile) {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    const formData: FormData = new FormData();
    formData.append("name",createTaskFile.name);
    formData.append("taskID",createTaskFile.taskID);
    formData.append("multipartFile",createTaskFile.multipartFile);
    return this.httpClient.post(desiredURL,formData,{responseType: 'blob',params: queryParams});
  }

  public deleteTaskFile(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
