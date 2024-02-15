import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url: string = "http://localhost:8080/api/v1/teams";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getTeamsByBoard(id: string): any 
  {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
