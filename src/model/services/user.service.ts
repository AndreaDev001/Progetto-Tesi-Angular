import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = "http://localhost:8080/api/v1/users";

  constructor(private httpClient: HttpClient) { 

  }

  public getGenders(): any {
    const desiredURL: string = this.url + "/public/" + "genders"
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}

