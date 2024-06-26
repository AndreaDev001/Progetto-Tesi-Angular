import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { CreateCheckListOption } from '../create';
import { UpdateCheckListOption } from '../update';
import { query } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CheckListOptionService {

  private url: string = "http://localhost:8080/api/v1/checkListOptions";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getOptionsByCheckList(listID: string): any {
    const desiredURL: string = this.url + "/private" + "/checklist" + "/" + listID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createOption(createCheckListOption: CreateCheckListOption): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createCheckListOption,{params: queryParams});
  }

  public updateOption(updateOption: UpdateCheckListOption): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updateOption,{params: queryParams});
  }
  
  public deleteOption(optionID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + optionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
  
  public getOptionsByCheckListAndCompleted(listID: string,completed: boolean): any {
    const desiredURL: string = this.url + "/private" + "/checklist" + "/" + listID + "/completed" + "/" + completed;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
