import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { CreateReport } from 'src/app/Forms/create-report/create-report.component';
import { query } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CommentReportService {

  private url: string = "http://localhost:8080/api/v1/commentReports";
  
  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  
  public createCommentReport(createReport: CreateReport,commentID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + commentID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createReport,{params: queryParams});
  }

  public hasReported(userID: string,commentID: string): any {
    const desiredURL: string = this.url + "/private" + "/comment/" + commentID + "/reporter/" + userID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams}); 
  }
}
