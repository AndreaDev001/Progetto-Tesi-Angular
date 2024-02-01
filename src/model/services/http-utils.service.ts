import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor() {

  }

  public generateParams(object: any): HttpParams 
  {
    let queryParams: HttpParams = new HttpParams();
    let keys = Object.keys(object);
    let values = Object.values(object);
    for(let i = 0;i < keys.length;i++) {
      let currentKey = keys[i];
      let currentValue: any = values[i];
      if(currentValue == undefined)
          continue;
      queryParams = queryParams.append(currentKey,currentValue);
    }
    return queryParams;
  }
}
