import { Component, EventEmitter, Input,Output } from '@angular/core';
import { TaskURLService } from 'src/model/services/task-url.service';
import { Task, TaskURL } from 'src/model/interfaces';

@Component({
  selector: 'app-task-url',
  templateUrl: './task-url.component.html',
  styleUrls: ['./task-url.component.css']
})
export class TaskURLComponent {
  @Input() taskURL: TaskURL | undefined = undefined;
  @Output() deletedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private taskURLService: TaskURLService) {

  }


  public deleteURL(): void {
    if(this.taskURL != undefined) {
      this.taskURLService.deleteTaskURL(this.taskURL.id).subscribe((value: any) => this.deletedEvent.emit(this.taskURL?.id));
    }
  }
}
