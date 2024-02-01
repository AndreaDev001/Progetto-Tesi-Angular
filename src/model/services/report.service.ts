import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = "http://localhost:8080/api/v1/reports";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getReasons(): any {
    const desiredURL: string = this.url + "/public/" + "reasons";
    let queryParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTypes(): any {
    const desiredURL: string = this.url + "/public/" + "types";
    let queryParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getReportsBySpec(): any {
    const desiredURL: string = this.url + "/public/" + "spec";
    let queryParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
