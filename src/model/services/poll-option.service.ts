import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class PollOptionService {

  private url: string = "http://localhost:8080/api/v1/pollOptions";

  constructor(private httpUtils: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getPollOptionsByPoll(pollID: string,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/poll" + "/" + pollID;
    let httpParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: httpParams});
  }
}
