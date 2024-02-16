import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { CreateTeam } from './Forms/create-team/create-team.component';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url: string = "http://localhost:8080/api/v1/teams";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createTeam(createTeam: CreateTeam): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,{params: queryParams});
  }

  public getTeamsByBoard(id: string): any 
  {
    const desiredURL: string = this.url + "/private" + "/board" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
