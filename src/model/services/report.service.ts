import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { Filter } from 'src/app/SearchPages/SearchUsers/user-filter/user-filter.component';
import { CreateReport } from 'src/app/Forms/create-report/create-report.component';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = "http://localhost:8080/api/v1/reports";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createReport(createReport: CreateReport,reportedID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + reportedID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createReport,{params: queryParams});
  }

  public getReportBetween(reporterID: string,reportedID: string): any {
    const desiredURL: string = this.url + "/private" + "/reporter" + "/" + reporterID + "/reported" + "/" + reportedID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getReasons(): any {
    const desiredURL: string = this.url + "/public" + "/reasons";
    let queryParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTypes(): any {
    const desiredURL: string = this.url + "/public" + "/types";
    let queryParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getReportsBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec";
    let queryParams = this.httpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public deleteReport(reportID: any): any {
    const desiredURL: string = this.url + "/private/" + reportID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
