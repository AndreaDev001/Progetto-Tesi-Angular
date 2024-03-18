import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { CreateReport } from 'src/app/Forms/create-report/create-report.component';

@Injectable({
  providedIn: 'root'
})
export class DiscussionReportService {

  private url: string = "http://localhost:8080/api/v1/discussionReports";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createDiscussionReport(createReport: CreateReport,discussionID: any): any {
    const desiredURL: string = this.url + "/private" + "/" + discussionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createReport,{params: queryParams});
  }

  public getReportBetween(discussionID: string,reporterID: string): any {
    const desiredURL: string = this.url + "/private" + "/discussion/" + discussionID + "/reporter" + "/" + reporterID;
    console.log("URL" + desiredURL);
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
