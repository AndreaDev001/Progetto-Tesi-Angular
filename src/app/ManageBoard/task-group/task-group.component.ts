import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faInfoCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { TaskGroup } from 'src/model/interfaces';

@Component({
  selector: 'app-task-group',
  templateUrl: './task-group.component.html',
  styleUrls: ['./task-group.component.css']
})
export class TaskGroupComponent {
  @Input() taskGroup: TaskGroup | undefined = undefined;
  @Input() createNew: boolean = false;
  public optionIcon: IconDefinition = faEllipsis;
  public addTaskIcon: IconDefinition = faPlus;
  public infoIcon: IconDefinition = faInfoCircle;
}
