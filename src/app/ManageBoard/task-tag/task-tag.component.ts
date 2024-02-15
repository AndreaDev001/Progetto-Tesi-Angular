import { Component, Input } from '@angular/core';
import { Tag } from 'src/model/interfaces';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.css']
})
export class TaskTagComponent {
  @Input() tag: Tag | undefined = undefined;
}
