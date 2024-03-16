import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagAssignmentService } from 'src/model/services/tag-assignment.service';
import { Tag, TagAssignment } from 'src/model/interfaces';
import { TagRef } from 'src/model/refs';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-tag',
  templateUrl: './task-tag.component.html',
  styleUrls: ['./task-tag.component.css']
})
export class TaskTagComponent implements OnInit {
  @Input() tag: Tag | undefined = undefined;
  @Input() tagRef: TagRef | undefined = undefined;
  @Input() fontSize: any | undefined = '12px';
  @Input() padding: any | undefined = '2px';
  @Input() canRemove: boolean = false;
  public removeIcon: IconDefinition = faRemove;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter();

  constructor(private tagAssignment: TagAssignmentService) {

  }

  public ngOnInit(): void {
    if(this.tagRef != undefined)
        this.tag = {id: this.tagRef.id,createdDate: this.tagRef.createdDate,name: this.tagRef.name,color: this.tagRef.color};
    
  }
  public removeTag(): void {
    this.removeEvent.emit();
  }
}
