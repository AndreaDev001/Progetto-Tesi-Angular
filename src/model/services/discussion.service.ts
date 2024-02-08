import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    const desiredURL: string = this.url + "/public/publisher/" + publisherID;
    let queryParams: HttpParams = this.httpUtils.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
