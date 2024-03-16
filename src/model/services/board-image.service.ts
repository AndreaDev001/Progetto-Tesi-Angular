import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBoardImage } from 'src/model/create';
import { HttpUtilsService } from 'src/model/services/http-utils.service';

@Injectable({
  providedIn: 'root'
})
export class BoardImageService {

  private url: string = "http://localhost:8080/api/v1/boardImages";

  constructor(private httpClient: HttpClient,private httpUtilsService: HttpUtilsService) {

  }
  
  public getBoardImage(boardID: string): any {
    const desiredURL: string = this.url + "/private" + "/board/" + boardID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public deleteImage(boardImageID: string): any {
    const desiredURL: string = this.url + "/private" + "/" + boardImageID;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.delete(desiredURL,{params: queryParams});
  }

  public createBoardImage(createBoardImage: CreateBoardImage): any {
    const desiredURL: string = this.url + "/private" + "/" + createBoardImage.boardID;
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' })
    let queryParams: HttpParams = new HttpParams();
    let formData: FormData = new FormData();
    formData.append("file",createBoardImage.file);
    return this.httpClient.post(desiredURL,formData,{headers: headers,params: queryParams});
  }
}
