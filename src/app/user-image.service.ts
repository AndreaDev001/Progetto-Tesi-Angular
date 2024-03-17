import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { UpdateUserImage } from 'src/model/update';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  private url: string = "http://localhost:8080/api/v1/userImages";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }

  public updateUserImage(updateUserImage: UpdateUserImage): any {
    const desiredURL: string = this.url + "/private";
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' })
    let queryParams: HttpParams = new HttpParams();
    const formData: FormData = new FormData();
    formData.append("file",updateUserImage.file);
    return this.httpClient.post(desiredURL,formData,{headers: headers,params: queryParams});
  }
}
