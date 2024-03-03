import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/model/interfaces';
import { TagRef } from 'src/model/refs';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.css']
})
export class TaskTagComponent implements OnInit {
  @Input() tag: Tag | undefined = undefined;
  @Input() tagRef: TagRef | undefined = undefined;
  @Input() fontSize: any | undefined = '15px';
  @Input() padding: any | undefined = '5px';
  @Input() canRemove: boolean = false;

  public ngOnInit(): void {
    if(this.tagRef != undefined)
        this.tag = {id: this.tagRef.id,createdDate: this.tagRef.createdDate,name: this.tagRef.name,color: this.tagRef.color};
  }
}
