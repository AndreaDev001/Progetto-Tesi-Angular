import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { CreateReport } from 'src/app/Forms/create-report/create-report.component';

@Injectable({
  providedIn: 'root'
})
export class PollReportService {
  
  private url: string = "http://localhost:8080/api/v1/pollReports";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createPollReport(createReport: CreateReport,pollID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + pollID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createReport,{params: queryParams});
  }

  public getReportBetween(pollID: string,reporterID: string): any {
    const desiredURL: string = this.url + "/private" + "/poll" + "/" + pollID + "/reporter" + "/" + reporterID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
