import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskImage } from 'src/model/create';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TaskImageService {

  private url: string = "http://localhost:8080/api/v1/taskImages";

  constructor(private httpClient: HttpClient,private httpClientUtils: HttpUtilsService) {

  }

  public getImagesByTask(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createImage(createTaskImage: CreateTaskImage): any {
    const desiredURL: string = this.url + "/private" + "/" + createTaskImage.taskID;
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' })
    let queryParams: HttpParams = new HttpParams();
    const formData: FormData = new FormData();
    for(let current of createTaskImage.files) {
      formData.append("files",current);
    }
    return this.httpClient.post(desiredURL,formData,{headers: headers,params: queryParams});
  }

  public deleteImage(taskImageID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskImageID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
