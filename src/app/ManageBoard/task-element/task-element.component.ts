import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faCheckCircle, faClockFour, faComment, faComments, faEllipsis, faFileDownload, faImage, faImages, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { TagService } from 'src/model/services/tag.service';
import { Board, CollectionModel, Tag, TagAssignment, Task, TaskAssignment } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { CanvasHandlerService } from 'src/app/canvas-handler.service';
import { TagAssignmentService } from 'src/model/services/tag-assignment.service';
import { TaskImageService } from 'src/model/services/task-image.service';
import { TaskService } from 'src/model/services/task.service';
import { BetterImageComponent } from 'src/app/Utility/components/better-image/better-image.component';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';


interface DescriptionItem
{
  icon: IconDefinition,
  amount: string
}
@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() board: Board | undefined = undefined;
  @Input() task: Task | undefined = undefined;
  @Input() isBoardAdmin: boolean = false;
  @Input() isAdmin: boolean = false;

  public searchingTagAssignments: boolean = false;
  public searchingTaskAssignments: boolean = false;

  public currentTagAssignments: TagAssignment[] = [];
  public currentTaskAssignments: TaskAssignment[] = [];

  public currentDescriptionItems: DescriptionItem[] = [];
  public optionIcon: IconDefinition = faEllipsis;
  public photoURL: any = undefined;

  @ViewChild("overlayTemplate") overlayTemplate: any;
  @ViewChild("betterImage") betterImage?: BetterImageComponent;

  constructor(private taskAssignmentService: TaskAssignmentService,private taskService: TaskService,private tagAssignmentService: TagAssignmentService,private canvasService: CanvasHandlerService,private authHandler: AuthHandlerService) {

  }

  public ngOnInit(): void 
  {
    this.getValues();
  }

  public updateTask(): void {
    if(this.task != undefined) {
      this.taskService.getTaskByID(this.task.id).subscribe((value: any) => {
        this.task = value
        this.getValues();
        this.betterImage?.reloadImage();
      });
    }
  }
  
  private getValues(): void {
    if(this.task != undefined)
    {
      this.generateDescriptionItems();
      this.searchTagAssignments();
      this.searchTaskAssignments();
    }
  }

  private generateDescriptionItems(): void {
    this.photoURL = "http://localhost:8080/api/v1/taskImages/public/task/" + this.task!!.id + "/first" + "/image";
    this.currentDescriptionItems = [];
    this.currentDescriptionItems.push({icon: faCheck,amount: this.task!!.amountOfCheckLists.toString()});
    this.currentDescriptionItems.push({icon: faImages,amount: this.task!!.amountOfImages.toString()})
    this.currentDescriptionItems.push({icon: faComments,amount: this.task!!.amountOfReceivedComments.toString()});
    this.currentDescriptionItems.push({icon: faPaperclip,amount: this.task!!.amountOfURLs.toString()});
  }

  private searchTaskAssignments(): void {
    this.searchingTaskAssignments = true;
    this.taskAssignmentService.getTaskAssignmentsByTask(this.task!!.id).subscribe((value: CollectionModel) => {
      this.searchingTaskAssignments = false;
      this.currentTaskAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    },(err: any) => this.searchingTaskAssignments = false);
  }

  private searchTagAssignments(): void {
    this.searchingTagAssignments = true;
    this.tagAssignmentService.getTagAssignments(this.task!!.id).subscribe((value: any) => {
      this.searchingTagAssignments = false;
      this.currentTagAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    },(err: any) => this.searchingTagAssignments = false);
  }

  public handleClick(): void {
    if(this.task != undefined) {
      this.canvasService.reset();
      this.canvasService.setDefaultValues(this.task.name != undefined ? this.task.name : this.task.title,"View and modify the task using the avaliable options");
      this.canvasService.setContentTemplate(this.overlayTemplate);
      this.canvasService.open();
    }
  }
}
