import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faClockFour, faEllipsis } from '@fortawesome/free-solid-svg-icons';


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
export class TaskElementComponent implements OnInit,OnDestroy {

  public descriptionItems: DescriptionItem[] = [];
  public optionIcon: IconDefinition = faEllipsis;

  public ngOnInit(): void {
    this.descriptionItems.push({icon: faClockFour,value: "24 Mar"});
    this.descriptionItems.push({icon: faCheck,value: "3/4"});
  }

  public ngOnDestroy(): void {

  }
}
