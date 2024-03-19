import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { CreatePollOption} from '../create';
import { UpdatePollOption } from '../update';

@Injectable({
  providedIn: 'root'
})
export class PollOptionService {

  private url: string = "http://localhost:8080/api/v1/pollOptions";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public getPollOptionsByPoll(pollID: string): any {
    const desiredURL: string = this.url + "/private" + "/poll" + "/" + pollID;
    let httpParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: httpParams});
  }

  public getPollOptionByID(optionID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + optionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createPollOption(createPollOption: CreatePollOption): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createPollOption,{params: queryParams});
  }

  public updatePollOption(updatePollOption: UpdatePollOption): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updatePollOption,{params: queryParams});
  }

  public deletePollOption(pollOptionID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + pollOptionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
