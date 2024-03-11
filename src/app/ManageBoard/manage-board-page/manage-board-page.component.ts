import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faInfo, faInfoCircle, faMagnifyingGlassMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, Timestamp } from 'rxjs';
import { TaskGroupService } from 'src/model/services/task-group.service';
import { Board, CollectionModel, Task, TaskGroup } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { TaskService } from 'src/model/services/task.service';
import { UpdateTask, UpdateTaskGroup } from 'src/model/update';
import {CreateTaskGroup}from 'src/model/create';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { group } from '@angular/animations';
import { AuthHandlerService } from 'src/app/auth/auth-handler.service';

@Component({
  selector: 'app-manage-board-page',
  templateUrl: './manage-board-page.component.html',
  styleUrls: ['./manage-board-page.component.css']
})
export class ManageBoardPageComponent implements OnInit,OnDestroy,AfterViewInit {
 
  private subscriptions: Subscription[] = [];
  public backgroundURL: string | undefined = undefined;
  public boardID: string | undefined = undefined;
  public currentBoard: Board | undefined = undefined;
  public currentTaskGroups: TaskGroup[] = [];
  public searchingTasks: boolean[] = [];
  public currentTasks: Task[][] = [];
  public optionIcon: IconDefinition = faEllipsis;
  public addTaskIcon: IconDefinition = faPlus;
  public infoIcon: IconDefinition = faInfoCircle;
  public currentSelectedTask: Task | undefined = undefined;
  public currentNewGroupName: string | undefined = undefined;
  public currentGroup: TaskGroup | undefined = undefined;
  public emptyIcon: IconDefinition = faMagnifyingGlassMinus;
  public searchingBoard: boolean = false;
  public currentHeight: any = undefined;
  @ViewChild("createTaskTemplate") createTaskTemplate: any;
  @ViewChild("taskElement") taskElement: any;

  constructor(private activatedRoute: ActivatedRoute,private authHandler: AuthHandlerService,public alertHandler: AlertHandlerService,private taskService: TaskService,private boardService: BoardService,private taskGroupService: TaskGroupService) {

  }

  public ngOnInit(): void {

    
    this.subscriptions.push(this.activatedRoute.params.subscribe((value: any) => {
      if(value.id != undefined) {
        this.boardID = value.id;
        let timeStamp = (new Date()).getTime();
        this.backgroundURL = "http://localhost:8080/api/v1/boardImages/public/image/" + value.id + "?" + 'time=' + timeStamp;
        this.updateItems();
      }
    }))  
  }

  public ngAfterViewInit(): void {
  }

  public reloadBoardInfo(): void {
    this.boardService.getBoardById(this.boardID).subscribe((value: Board) => {
      this.alertHandler.close();
      this.currentBoard = value;
      let timeStamp = (new Date()).getTime();
      this.backgroundURL = "http://localhost:8080/api/v1/boardImages/public/image/" + this.currentBoard.id + "?" + 'time=' + timeStamp;
    })
  }


  public test(event: any): void {
    this.currentHeight = event.source.element.nativeElement.offsetHeight;
  }

  public updateDraggedTask(event: any): void {
    console.log(event.target.nativeElement.offsetHeight);
  }
  public updateItems(): void {
    if(this.boardID != undefined) {
      this.searchingBoard = true;
      this.boardService.getBoardById(this.boardID).subscribe((value: Board) => {
        this.currentBoard = value;
        this.searchingBoard = false;
        if(this.currentBoard != undefined) {
          this.taskGroupService.getTaskGroupsByBoard(this.boardID).subscribe((value: CollectionModel) => {
            this.currentTaskGroups = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
            for(let i = 0;i < this.currentTaskGroups.length;i++) {
              this.currentTasks.push([]);
              this.searchingTasks.push(false);
            }
            for(let i = 0;i < this.currentTaskGroups.length;i++)
                this.updateTasksForGroup(i);
          })
        }
      });
    }
  }


  public addNewTask(event: any): void {
    if(this.currentGroup != undefined) 
    {
      let index: number = this.currentTaskGroups.indexOf(this.currentGroup);
      this.currentTasks[index].push(event);
    }
  }

  public deleteGroup(groupID: string,index: number): void {
    let group: TaskGroup = this.currentTaskGroups[index];
    this.taskGroupService.deleteTaskGroup(groupID).subscribe((value: any) => {
      this.currentTaskGroups = this.currentTaskGroups.filter(current => current !== group);
    })
  }

  public clearGroup(groupID: string,index: number): void {
    this.taskGroupService.clearTaskGroup(groupID).subscribe((value: any) => {
      this.currentTasks[index] = [];
    })
  }

  public createGroup(): void {
    if(this.currentNewGroupName != undefined && this.boardID != undefined) {
      let createGroup: CreateTaskGroup = {boardID: this.boardID,name: this.currentNewGroupName};
      this.taskGroupService.createTaskGroup(createGroup).subscribe((value: any) => {
        this.currentTaskGroups.push(value);
        this.currentTasks.push([]);
        this.currentNewGroupName = undefined;
      },(err: any) => this.currentNewGroupName = undefined);
    }
  }

  private updateTasksForGroup(index: any): void {
    let currentTaskGroup: TaskGroup = this.currentTaskGroups[index];
    this.searchingTasks[index] = true;
    this.taskService.getTasksByGroup(currentTaskGroup.id).subscribe((value: CollectionModel) => {
      this.searchingTasks[index] = false;
      this.currentTasks[index] = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    })
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

  public addTask(group: TaskGroup): void 
  {
    if(this.createTaskTemplate != undefined) {
      this.currentGroup = group;
      this.alertHandler.reset();
      this.alertHandler.setTextTemplate(this.createTaskTemplate);
      this.alertHandler.open();
    }
  }

  public dropList(event: any): void
  {
    let previousTasks = this.currentTasks[event.previousIndex];
    let currentTasks = this.currentTasks[event.currentIndex];
    this.currentTasks[event.previousIndex] = currentTasks;
    this.currentTasks[event.currentIndex] = previousTasks;
    let firstGroupUpdate: UpdateTaskGroup = {groupID: this.currentTaskGroups[event.previousIndex].id,order: event.currentIndex};
    let secondGroupUpdate: UpdateTaskGroup = {groupID: this.currentTaskGroups[event.currentIndex].id,order: event.previousIndex};
    this.taskGroupService.updateTaskGroup(firstGroupUpdate).subscribe((value: any) => console.log(value));
    this.taskGroupService.updateTaskGroup(secondGroupUpdate).subscribe((value: any) => console.log(value));
    moveItemInArray(this.currentTaskGroups,event.previousIndex,event.currentIndex);
  }

  public updateNewGroupName(event: any): void {
    this.currentNewGroupName = event.target.value;
  }

  public dropItem(event: any): any 
  {
    if(this.currentSelectedTask != undefined) 
    {
      let index: number = event.container.id.split("container")[1];
      if(event.previousContainer == event.container) {
        let updateFirstTask: UpdateTask = {order: event.currentIndex,taskID: this.currentSelectedTask.id};
        let updateSecondTask: UpdateTask = {order: event.previousIndex,taskID: this.currentTasks[index][event.currentIndex].id};
        this.taskService.updateTask(updateFirstTask).subscribe((value: any) => console.log(value));
        this.taskService.updateTask(updateSecondTask).subscribe((value: any) => console.log(value));
      }
      else
      {
        let updateFirstTask: UpdateTask = {groupID: this.currentTaskGroups[index].id,taskID: this.currentSelectedTask.id};
        this.taskService.updateTask(updateFirstTask).subscribe((value: any) => {
          this.currentSelectedTask = undefined;
        },(err: any) => this.currentSelectedTask = undefined);
      }
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
    }
  }
  
  public nameChanged(event: any,groupID: any): any {
    const requiredName = event.target.value;
    if(requiredName != undefined) {
      let updateTaskGroup: UpdateTaskGroup = {groupID: groupID,name: requiredName};
      this.taskGroupService.updateTaskGroup(updateTaskGroup).subscribe((value: any) => console.log(value));
    }
  }

  public updateCurrentTask(event: any,value: any): any {
    this.currentSelectedTask = value;
  }

  public resetCurrentTask(): void {
    this.currentSelectedTask = undefined;
  }

  public handleTaskChange(event: string): void {

  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public updateTask(event: any,groupIndex: number,taskIndex: number): void {
    console.log("called");
    this.taskService.getTaskByID(event).subscribe((value: any) => {
      this.currentTasks[groupIndex][taskIndex] = value;
    })
  }
}
