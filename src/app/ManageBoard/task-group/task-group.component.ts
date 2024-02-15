import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faInfoCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CollectionModel, Task, TaskGroup } from 'src/model/interfaces';
import { TaskService } from 'src/model/services/task.service';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css']
})
export class TaskGroupComponent implements OnInit {

  @Input() taskGroup: TaskGroup | undefined = undefined;
  @Input() createNew: boolean = false;
  public currentTasks: Task[] = [];
  public optionIcon: IconDefinition = faEllipsis;
  public addTaskIcon: IconDefinition = faPlus;
  public infoIcon: IconDefinition = faInfoCircle;

  constructor(private taskService: TaskService) {

  }

  public ngOnInit(): void {
    if(this.taskGroup != undefined) {
      this.taskService.getTasksByGroup(this.taskGroup.id).subscribe((value: CollectionModel) => {
        this.currentTasks = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      })
    }
  }
}
