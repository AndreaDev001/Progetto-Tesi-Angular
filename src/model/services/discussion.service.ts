import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from 'src/app/SearchPages/DiscussionPage/discussion-filter/discussion-filter.component';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private url: string = "http://localhost:8080/api/v1/discussions";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getDiscussionsByPublisher(publisherID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + +"/private" + "/publisher" + "/" + publisherID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getDiscussionsBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec";
    let queryParams: HttpParams = this.httpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getSimilarDiscussions(discussionID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + + "/private" + "/similar" + "/" + discussionID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getDiscussionById(id: any): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
