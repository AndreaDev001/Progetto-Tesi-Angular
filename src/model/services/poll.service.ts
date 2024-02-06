import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { PaginationComponent } from '../../app/Utility/pagination/pagination.component';
import { PaginationRequest } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private url: string = "http://localhost:8080/api/v1/polls";

  constructor(private httpUtilsService: HttpUtilsService,private httpClient: HttpClient) {

  }

  public getPollsByPublisher(publisherID: any,page: PaginationRequest): any {
    const desiredURL: string = this.url + "/public/" + publisherID;
    let queryParams: HttpParams = this.httpUtilsService.generatePaginationParams(page);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}