import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { PaginationComponent } from '../../app/Utility/pagination/pagination.component';
import { PaginationRequest } from '../interfaces';
import { Filter } from 'src/app/SearchPages/PollPage/poll-filter/poll-filter.component';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private url: string = "http://localhost:8080/api/v1/polls";

  constructor(private httpUtilsService: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getPollsByPublisher(publisherID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/publisher" + "/" + publisherID;
    let queryParams: HttpParams = this.httpUtilsService.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
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
