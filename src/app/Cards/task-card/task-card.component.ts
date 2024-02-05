import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/model/interfaces';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  
  @Input() task: Task | undefined = undefined;
  public likeIcon: IconDefinition = faHeart;
  public membersIcon: IconDefinition = faUserGroup;
  public calendarIcon: IconDefinition = faCalendarDays;

  public ngOnInit(): void {

  }
}
