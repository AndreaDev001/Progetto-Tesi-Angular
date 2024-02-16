import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'src/model/services/http-utils.service';
import { Filter } from 'src/app/SearchPages/TaskPage/task-filter/task-filter.component';
import { CreateBoard } from 'src/app/Forms/create-board/create-board.component';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private url: string = "http://localhost:8080/api/v1/boards";

  constructor(private httpClient: HttpClient,private httpUtils: HttpUtilsService) {

  }

  public createBoard(createBoard: CreateBoard): any {
    const desiredURL: string = this.url + "/private";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.post(desiredURL,createBoard,{params: queryParams});
  }

  public getVisibilities(): any {
    const desiredURL: string = this.url + "/public/" + "visibilities";
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }


  public getBoardById(id: any): any {
    const desiredURL: string = this.url + "/private" + "/" + id;
    let queryParams: HttpParams = new HttpParams();
    return this.httpClient.get(desiredURL,{params: queryParams});
  }

  public getBoardsBySpec(filter: Filter): any {
    const desiredURL: string = this.url + "/private/" + "spec";
    let queryParams: HttpParams = this.httpUtils.generateParams(filter);
    return this.httpClient.get(desiredURL,{params: queryParams});
  }
}
