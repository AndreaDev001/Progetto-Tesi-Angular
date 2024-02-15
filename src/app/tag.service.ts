import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url: string = "http://localhost:8080/api/v1/tags";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getTagsByTask(id: any): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
