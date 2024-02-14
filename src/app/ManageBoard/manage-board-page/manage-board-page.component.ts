import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskGroupService } from 'src/app/task-group.service';
import { Board, CollectionModel, TaskGroup } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';

@Component({
  selector: 'app-manage-board-page',
  templateUrl: './manage-board-page.component.html',
  styleUrls: ['./manage-board-page.component.css']
})
export class ManageBoardPageComponent implements OnInit,OnDestroy {
 
  private subscriptions: Subscription[] = [];
  public boardID: string | undefined = undefined;
  public currentBoard: Board | undefined = undefined;
  public currentTaskGroups: TaskGroup[] = [];

  constructor(private activatedRoute: ActivatedRoute,private boardService: BoardService,private taskGroupService: TaskGroupService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.boardID = value.id;
        this.updateItems();
      }
    }))  
  }

  private updateItems(): void {
    if(this.boardID != undefined) {
      this.boardService.getBoardById(this.boardID).subscribe((value: Board) => {
        this.currentBoard = value;
        if(this.currentBoard != undefined) {
          this.taskGroupService.getTaskGroupsByBoard(this.boardID).subscribe((value: CollectionModel) => {
            this.currentTaskGroups = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
          })
        }
      });
    }
  }
  
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
