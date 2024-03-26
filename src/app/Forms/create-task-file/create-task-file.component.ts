import { Component, EventEmitter,Input,Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { Validators } from 'ngx-editor';
import { CreateTaskFile } from 'src/model/create';
import { TaskFileService } from 'src/model/services/task-file.service';

@Component({
  selector: 'app-create-task-file',
  templateUrl: './create-task-file.component.html',
  styleUrls: ['./create-task-file.component.css']
})
export class CreateTaskFileComponent {

  @Input() taskID: any = undefined;
  public formGroup: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required()]),
      file: new FormControl('',[Validators.required()])
  });
  public fileIcon: IconDefinition = faFileUpload;
  public currentFile: any = undefined;
  public isCreating: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private taskFileService: TaskFileService) {

  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.file != undefined && this.formGroup.valid && this.currentFile != undefined) {
      let createTaskFile: CreateTaskFile = {name: this.name.value,multipartFile: this.currentFile,taskID: this.taskID};
      this.submitEvent.emit(createTaskFile);
      this.reset();
      this.isCreating = true;
      this.taskFileService.createTaskFile(createTaskFile).subscribe((value: any) => {
        this.isCreating = false;
        this.successEvent.emit(value);
      },(err: any) => {
        this.isCreating = false;
        this.failedEvent.emit(err);
      });
    } 
  }

  public updateCurrentFile(event: any): void {
    this.currentFile = event.target.files[0];
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name(): any {return this.formGroup.get("name")};
  get file(): any {return this.formGroup.get("file")};
}
