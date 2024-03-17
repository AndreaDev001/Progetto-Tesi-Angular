import { Component, EventEmitter, Input,Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFile, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { TaskFile } from 'src/model/interfaces';
import { TaskFileService } from 'src/model/services/task-file.service';

@Component({
  selector: 'app-task-file',
  templateUrl: './task-file.component.html',
  styleUrls: ['./task-file.component.css']
})
export class TaskFileComponent {
  @Input() taskFile: TaskFile | undefined = undefined;
  @Output() deletedEvent: EventEmitter<any> = new EventEmitter();
  @Output() downloadEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();
  public fileIcon: IconDefinition = faFileDownload;

  constructor(private taskFileService: TaskFileService) {

  }

  public deleteFile(): void {
    if(this.taskFile != undefined)
        this.taskFileService.deleteTaskFile(this.taskFile.id).subscribe((value: any) => this.deletedEvent.emit(this.taskFile?.id));
  }


  public downloadFile(event: any): void {
    event.preventDefault();
    this.taskFileService.getTaskFilesAsBytes(this.taskFile!!.id).subscribe((response: any) => {
      console.log(response.headers.get('content-disposition'));
    })
  }
}
