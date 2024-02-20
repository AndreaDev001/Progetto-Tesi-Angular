import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private url: string = "http://localhost:8080/api/v1/teamMembers";


  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public deleteTeamMember(id: string): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }

  public getTeamMembersByTeam(id: string): any {
    const desiredURL: string = this.url + "/private" + "/team" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getTeamMembersByMember(id: string): any {
    const desiredURL: string = this.url + "/private" + "/member" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
