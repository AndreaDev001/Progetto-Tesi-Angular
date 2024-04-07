import { Component, EventEmitter, Input,Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faFile, faFileDownload } from '@fortawesome/free-solid-svg-icons';
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
  @Input() canModify: boolean = false;
  public fileIcon: IconDefinition = faDownload;

  constructor(private taskFileService: TaskFileService) {

  }

  public deleteFile(): void {
    if(this.taskFile != undefined)
        this.taskFileService.deleteTaskFile(this.taskFile.id).subscribe((value: any) => this.deletedEvent.emit(this.taskFile?.id));
  }


  public downloadFile(): void {
    this.taskFileService.getTaskFilesAsBytes(this.taskFile!!.id).subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let newLink = document.createElement('a');
        newLink.href = window.URL.createObjectURL(new Blob(binaryData,{type: dataType}));
        if(this.taskFile != undefined) {
          newLink.setAttribute('download',this.taskFile.name);
          document.body.append(newLink);
          newLink.click();
        }
    })
  }
}
