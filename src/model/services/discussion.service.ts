import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDiscussion } from '../create';
import { Filter } from 'src/app/SearchPages/SearchDiscussions/discussion-filter/discussion-filter.component';
import { PaginationRequest } from 'src/model/interfaces';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { UpdateDiscussion } from '../update';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private url: string = "http://localhost:8080/api/v1/discussions";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createDiscussion(createDiscussion: CreateDiscussion): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createDiscussion,{params: queryParams});
  }

  public updateDiscussion(updateDiscussion: UpdateDiscussion): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.put(desiredURL,updateDiscussion,{params: queryParams});
  }

  public deleteDiscussion(discussionID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + discussionID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }

  public getDiscussionsByPublisher(publisherID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url +"/private" + "/publisher" + "/" + publisherID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getDiscussionsBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private" + "/spec";
    let queryParams: HttpParams = this.httpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getSimilarDiscussions(discussionID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/private" + "/similar" + "/" + discussionID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getDiscussionById(id: any): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
