import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { CreateReport } from 'src/app/Forms/create-report/create-report.component';

@Injectable({
  providedIn: 'root'
})
export class TaskReportService {

  private url: string = "http://localhost:8080/api/v1/taskReports";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createTaskReport(createReport: CreateReport,taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + taskID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createReport,{params: queryParams});
  }

  public hasReported(userID: string,taskID: string): any {
    const desiredURL: string = this.url + "/private" + "/task" + "/" + taskID + "/reporter" + "/" + userID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public deleteReport(reportID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + reportID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
