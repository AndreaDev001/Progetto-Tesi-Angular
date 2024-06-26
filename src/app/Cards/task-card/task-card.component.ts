import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays, faHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/model/interfaces';
import { TaskRef } from 'src/model/refs';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  
  @Input() task: Task | undefined = undefined;
  @Input() taskRef: TaskRef | undefined = undefined;
  public likeIcon: IconDefinition = faHeart;
  public membersIcon: IconDefinition = faUserGroup;
  public calendarIcon: IconDefinition = faCalendarDays;

  constructor(public router: Router) {

  }

  public ngOnInit(): void {
    if(this.taskRef != undefined) {
      console.log(this.taskRef);
      this.task = {id: this.taskRef.id,createdDate: this.taskRef.createdDate,expirationDate: this.taskRef.expirationDate,publisher: this.taskRef.publisher,title: this.taskRef.title,description: this.taskRef.description,amountOfReceivedLikes: this.taskRef.amountOfLikes,amountOfAssignments: this.taskRef.amountOfAssignedMembers,amountOfCheckLists: 0,amountOfImages: 0,amountOfReceivedComments: 0,amountOfFiles: 0,amountOfURLs: 0,taskGroup: this.taskRef.taskGroup};
      console.log(this.task);
    }
  }

  public openBoard(): void {
    this.router.navigateByUrl("/board" + "/" + this.task?.taskGroup?.board.id);
  }
}
