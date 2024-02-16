import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faInfo, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { TaskGroupService } from 'src/app/task-group.service';
import { Board, CollectionModel, Task, TaskGroup } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { TaskService } from 'src/model/services/task.service';

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
  public currentTasks: Task[][] = [];
  public optionIcon: IconDefinition = faEllipsis;
  public addTaskIcon: IconDefinition = faPlus;
  public infoIcon: IconDefinition = faInfoCircle;

  constructor(private activatedRoute: ActivatedRoute,private taskService: TaskService,private boardService: BoardService,private taskGroupService: TaskGroupService) {

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
            if(this.currentTaskGroups != undefined) {
              this.currentTaskGroups.forEach((group: any) => {
                this.taskService.getTasksByGroup(group.id).subscribe((task: CollectionModel) => {
                  let values: Task[] = task._embedded != undefined && task._embedded.content != undefined ? task._embedded.content : [];
                  this.currentTasks.push(values);
                })
              })
            }
          })
        }
      });
    }
  }

  public generateConnection(index: number): any {
    let values: any[] = [];
    let defaultName: string = "container" + index;
    for(let i = 0;i < this.currentTaskGroups.length;i++) {
      let currentName: string = "container" + i;
      if(currentName == defaultName)
          continue;
      values.push(currentName);
    }
    return values;
  }


  public dropList(event: any): void
  {
    let previousTasks = this.currentTasks[event.previousIndex];
    let currentTasks = this.currentTasks[event.currentIndex];
    this.currentTasks[event.previousIndex] = currentTasks;
    this.currentTasks[event.currentIndex] = previousTasks;
    moveItemInArray(this.currentTaskGroups,event.previousIndex,event.currentIndex);
  }

  public dropItem(event: any): any {
    transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
  }

  @HostListener('window:dragover', ['$event'])
  windowDragOver(event: Event) {
    event.preventDefault();
  }

  
  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }
}
