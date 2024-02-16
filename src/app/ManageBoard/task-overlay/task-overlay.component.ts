import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChain, faCheck, faClockFour, faClose, faIdCard, faLineChart, faMessage, faPlus, faTag, faTasks, faUser } from '@fortawesome/free-solid-svg-icons';

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
export class TaskOverlayComponent implements OnInit {
  public taskIcon: IconDefinition = faIdCard;
  public closeIcon: IconDefinition = faClose;
  public addIcon: IconDefinition = faPlus;
  public descriptionIcon: IconDefinition = faLineChart;
  public commentIcon: IconDefinition = faMessage;
  public buttonOptions: ButtonOption[] = [];

  public ngOnInit(): void {
    this.buttonOptions.push({name: "Members",icon: faUser,callback: () => {}});
    this.buttonOptions.push({name: "Tags",icon: faTag,callback: () => {}});
    this.buttonOptions.push({name: "CheckList",icon: faCheck,callback: () => {}});
    this.buttonOptions.push({name: "Date",icon: faClockFour,callback: () => {}});
  }
}
