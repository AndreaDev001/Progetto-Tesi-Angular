import { Component, Input } from '@angular/core';
import { Task, TaskURL } from 'src/model/interfaces';

@Component({
  selector: 'app-task-url',
  templateUrl: './task-url.component.html',
  styleUrls: ['./task-url.component.css']
})
export class TaskURLComponent {
  @Input() taskURL: TaskURL | undefined = undefined;
}
