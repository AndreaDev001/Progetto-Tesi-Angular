import { Component, EventEmitter,Output,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFileUpload, faImage, faImagePortrait, faRemove } from '@fortawesome/free-solid-svg-icons';
import { TaskImageService } from 'src/model/services/task-image.service';
import { CreateTaskImage } from 'src/model/create';

@Component({
  selector: 'app-create-task-image',
  templateUrl: './create-task-image.component.html',
  styleUrls: ['./create-task-image.component.css']
})
export class CreateTaskImageComponent {

  public imageIcon: IconDefinition = faFileUpload;
  public currentFiles: any[] = [];
  public currentFileSelected: any | undefined = undefined;
  public formGroup: FormGroup = new FormGroup({
    image: new FormControl('',[Validators.required])
  })
  public removeIcon: IconDefinition = faRemove;
  @Input() taskID: any = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();



  constructor(private taskImageService: TaskImageService) {

  }

  public ngOnInit(): void {
    
  }

  public updateCurrentFiles(event: any): void {
    for(let current of event.target.files) {
      this.currentFiles.push(current);
    }
    this.formGroup.reset();
  }

  public handleSubmit(event: any): void {
    if(this.currentFiles.length > 0 && this.taskID != undefined) {
      let createTaskImage: CreateTaskImage = {taskID: this.taskID,files: this.currentFiles};
      this.submitEvent.emit(createTaskImage);
      this.taskImageService.createImage(createTaskImage).subscribe((value: any) => {
        this.successEvent.emit(value);
      },(err: any) => this.failedEvent.emit(err));
    }
  }

  public removeFile(file: any): void {
    this.currentFiles = this.currentFiles.filter((current: any) => current !== file);
  }

  get image() {return this.formGroup.get("image")}
}
