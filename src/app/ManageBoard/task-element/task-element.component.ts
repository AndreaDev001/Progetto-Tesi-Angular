import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faCheckCircle, faClockFour, faComment, faComments, faEllipsis, faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import { TagService } from 'src/model/services/tag.service';
import { Board, CollectionModel, Tag, TagAssignment, Task, TaskAssignment } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { CanvasHandlerService } from 'src/app/canvas-handler.service';
import { TagAssignmentService } from 'src/app/tag-assignment.service';
import { TaskImageService } from 'src/app/task-image.service';


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
  public currentTagAssignments: TagAssignment[] = [];
  public currentTaskAssignments: TaskAssignment[] = [];
  public currentDescriptionItems: DescriptionItem[] = [];
  public optionIcon: IconDefinition = faEllipsis;

  @ViewChild("overlayTemplate") overlayTemplate: any;

  constructor(private taskAssignment: TaskAssignmentService,private tagAssignmentService: TagAssignmentService,private canvasService: CanvasHandlerService) {

  }

  public ngOnInit(): void 
  {
    if(this.task != undefined)
    {
      this.currentDescriptionItems.push({icon: faCheck,amount: this.task.amountOfCheckLists.toString()});
      this.currentDescriptionItems.push({icon: faImages,amount: this.task.amountOfImages.toString()})
      this.currentDescriptionItems.push({icon: faComments,amount: this.task.amountOfReceivedComments.toString()});
      this.taskAssignment.getTaskAssignmentsByTask(this.task.id).subscribe((value: CollectionModel) => {
        this.currentTaskAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      })
      this.tagAssignmentService.getTagAssignments(this.task.id).subscribe((value: any) => {
        this.currentTagAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      })
    }
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
