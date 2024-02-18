import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChain, faCheck, faClockFour, faClose, faIdCard, faLineChart, faMessage, faPlus, faTag, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { TagService } from 'src/model/services/tag.service';
import { CollectionModel, Tag, Task, TaskAssignment } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';

interface ButtonOption
{
  name: string,
  icon: IconDefinition,
  callback: () => void;
}
@Component({
  selector: 'app-task-overlay',
  templateUrl: './task-overlay.component.html',
  styleUrls: ['./task-overlay.component.css']
})
export class TaskOverlayComponent implements OnInit 
{
  @Input() task: Task | undefined = undefined;

  public taskIcon: IconDefinition = faIdCard;
  public closeIcon: IconDefinition = faClose;
  public addIcon: IconDefinition = faPlus;
  public descriptionIcon: IconDefinition = faLineChart;
  public commentIcon: IconDefinition = faMessage;
  public buttonOptions: ButtonOption[] = [];

  public currentMembers: TaskAssignment[] = [];
  public currentTags: Tag[] = [];

  constructor(private taskAssignmentsService: TaskAssignmentService,private tagService: TagService) {

  }

  public ngOnInit(): void {
    this.initializeOptions();
    if(this.task != undefined)
    {
      this.taskAssignmentsService.getTaskAssignmentsByTask(this.task.id).subscribe((value: CollectionModel) => this.currentMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
      this.tagService.getTagsByTask(this.task.id).subscribe((value: CollectionModel) => this.currentTags = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
    }
  }

  private initializeOptions(): any {
    this.buttonOptions.push({name: "Members",icon: faUser,callback: () => {}});
    this.buttonOptions.push({name: "Tags",icon: faTag,callback: () => {}});
    this.buttonOptions.push({name: "CheckList",icon: faCheck,callback: () => {}});
    this.buttonOptions.push({name: "Date",icon: faClockFour,callback: () => {}});
  }
}
