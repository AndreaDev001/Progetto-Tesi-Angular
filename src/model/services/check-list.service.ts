import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { CreateCheckList } from '../create';
import { UpdateCheckList } from '../update';

@Injectable({
  providedIn: 'root'
})
export class CheckListService {
  private url: string = "http://localhost:8080/api/v1/checkLists";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getCheckListsByTask(taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createCheckList(createCheckList: CreateCheckList): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createCheckList,{params: queryParams});
  }

  public updateCheckList(updateCheckList: UpdateCheckList): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updateCheckList,{params: queryParams});
  }

  public deleteCheckList(checkListID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + checkListID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
