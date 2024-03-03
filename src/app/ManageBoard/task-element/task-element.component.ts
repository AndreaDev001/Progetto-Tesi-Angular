import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faClockFour, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { TagService } from 'src/model/services/tag.service';
import { Board, CollectionModel, Tag, Task, TaskAssignment } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { CanvasHandlerService } from 'src/app/canvas-handler.service';


interface DescriptionItem
{
  icon: IconDefinition,
  value: string
}
@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() board: Board | undefined = undefined;
  @Input() task: Task | undefined = undefined;
  public currentTags: Tag[] = [];
  public currentTaskAssignments: TaskAssignment[] = [];
  public currentDescriptionItems: DescriptionItem[] = [];
  public optionIcon: IconDefinition = faEllipsis;

  @ViewChild("overlayTemplate") overlayTemplate: any;

  constructor(private tagService: TagService,private taskAssignment: TaskAssignmentService,private canvasService: CanvasHandlerService) {

  }

  public ngOnInit(): void 
  {
    if(this.task != undefined)
    {
      this.taskAssignment.getTaskAssignmentsByTask(this.task.id).subscribe((value: CollectionModel) => {
        this.currentTaskAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
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
