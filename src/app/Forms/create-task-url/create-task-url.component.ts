import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFile, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Validators } from 'ngx-editor';
import { TaskURLService } from 'src/app/task-url.service';
import { CreateTaskURL } from 'src/model/create';

@Component({
  selector: 'app-create-task-url',
  templateUrl: './create-task-url.component.html',
  styleUrls: ['./create-task-url.component.css']
})
export class CreateTaskURLComponent {
  @Input() taskID: any = undefined;
  public formGroup: FormGroup = new FormGroup({
    url: new FormControl<String>('',[Validators.required()])
  })
  public urlIcon: IconDefinition = faPaperclip;
  public isCreating: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private taskURLService: TaskURLService) {

  }

  public handleSubmit(event: any): void {
    if(this.url != undefined && this.formGroup.valid && this.taskID != undefined) {
      let createTaskURL: CreateTaskURL = {url: this.url.value,taskID: this.taskID};
      this.submitEvent.emit(createTaskURL);
      this.formGroup.reset();
      this.isCreating = true;
      this.taskURLService.createTaskURL(createTaskURL).subscribe((value: any) => {
        this.isCreating = false;
        this.successEvent.emit(value)
      },(err: any) => {
        this.isCreating = false;
        this.failedEvent.emit(err);
      });
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }
  get url(): any {return this.formGroup.get("url")};
}
