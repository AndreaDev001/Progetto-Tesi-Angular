import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRoleOwner } from 'src/model/create';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class RoleOwnerService {

  private url: string = "http://localhost:8080/api/v1/roleOwners";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public getRolesByOwner(userID: string): any {
    const desiredURL: string = this.url + "/private" + "/owner" + "/" + userID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams}); 
  }


  public hasRole(name: string,ownerID: string,boardID: string): any {
    const desiredURL: string = this.url + "/private" + "/owner" + "/" + ownerID + "/board" + "/" + boardID  + "/name" + "/" + name;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public createRoleOwner(createRoleOwner: CreateRoleOwner): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createRoleOwner,{params: queryParams});
  }

  public deleteRoleOwner(name: string,userID: string,boardID: string): any {
    const desiredURL: string = this.url + "/private" + "/name" + "/" + name + "/owner" + "/" + userID + "/board" + "/" + boardID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }
}
