import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from './http-utils.service';
import { Filter } from '../../app/BanPage/ban-filter/ban-filter.component';

@Injectable({
  providedIn: 'root'
})
export class BanService {

  private url: string = "http://localhost:8080/api/v1/bans";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getTypes(): any {
    const desiredURL: string = this.url + "/public/" + "types";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getBansBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/public/" + "spec";
    let queryParams: HttpParams = this.httpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
