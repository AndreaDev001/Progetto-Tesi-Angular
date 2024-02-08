import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/model/interfaces';
import { TaskRef } from 'src/model/refs';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit,OnChanges{
  
  @Input() task: Task | undefined = undefined;
  @Input() taskRef: TaskRef | undefined = undefined;
  public likeIcon: IconDefinition = faHeart;
  public membersIcon: IconDefinition = faUserGroup;
  public calendarIcon: IconDefinition = faCalendarDays;

  public ngOnInit(): void {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['taskRef'] != undefined && this.taskRef != undefined) {
        this.task = {createdDate: this.taskRef.createdDate,expirationDate: this.taskRef.expirationDate,publisher: this.taskRef.publisher,title: this.taskRef.title,description: this.taskRef.description,amountOfLikes: this.taskRef.amountOfLikes,amountOfAssignedMembers: this.taskRef.amountOfAssignedMembers}
    }
  }
}
