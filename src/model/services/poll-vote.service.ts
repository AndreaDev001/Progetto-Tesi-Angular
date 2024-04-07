import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class PollVoteService {

  private url: string = "http://localhost:8080/api/v1/pollVotes";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public createVote(optionID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + optionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }

  public getCurrentVotedOption(pollID: string): any {
    const desiredURL: string = this.url + "/private" + "/poll" + "/" + pollID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
