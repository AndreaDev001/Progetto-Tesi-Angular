import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { PaginationComponent } from '../../app/Utility/components/pagination/pagination.component';
import { PaginationRequest } from '../interfaces';
import { Filter } from 'src/app/SearchPages/SearchPolls/poll-filter/poll-filter.component';
import { CreatePoll } from 'src/app/Forms/create-poll/create-poll.component';
import { UpdatePoll } from '../update';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private url: string = "http://localhost:8080/api/v1/polls";

  constructor(private httpUtilsService: HttpUtilsService,private httpClient: HttpClient) {

  }

  public createPoll(createPoll: CreatePoll): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createPoll,{params: queryParams})
  }

  public updatePoll(updatePoll: UpdatePoll): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updatePoll,{params: queryParams});
  }

  public deletePoll(pollID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + pollID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }

  public getPollsByPublisher(publisherID: any,page: PaginationRequest,context: any = undefined): any {
    context = context != undefined ? context : this;
    const desiredURL: string = context.url + "/private" + "/publisher" + "/" + publisherID;
    let queryParams: HttpParams = context.httpUtilsService.generatePaginationParams(page);
    return context.httpClient.get(desiredURL,{params: queryParams});
  }

  public getPollsBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec";
    let queryParams: HttpParams = this.httpUtilsService.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getStatues(): any {
    const desiredURL: string = this.url + "/public" + "/statues";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getSimilarPolls(pollID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/public" + "/similar" + "/" + pollID;
    let queryParams: HttpParams = this.httpUtilsService.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getPollByID(id: string): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
