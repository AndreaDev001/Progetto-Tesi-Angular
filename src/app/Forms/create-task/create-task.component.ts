import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from 'src/app/Utility/components/dropdown/dropdown.component';
import { CreateTask } from 'src/model/create';
import { CollectionModel } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { TaskService } from 'src/model/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements AfterViewInit {

  @Input() groupID: any = undefined;
  public currentPriorities: string[] = [];
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    name: new FormControl<String>('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    description: new FormControl<String>('',[Validators.required,Validators.minLength(20),Validators.maxLength(200)]),
    priority: new FormControl<String>('',Validators.required)
  })
  public taskIcon: IconDefinition = faTasks;
  public isCreating: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private taskService: TaskService) {

  }

  public ngAfterViewInit(): void {
    this.searchPriorities();
  }

  private searchPriorities(): void {
    this.taskService.getPriorities().subscribe((value: CollectionModel) => {
      this.currentPriorities = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    });
  }

  public handleSubmit(event: any): void {
    if(this.groupID != undefined) 
    {
      if(this.formGroup.valid && this.title != undefined && this.name != undefined && this.description != undefined && this.priority != undefined) {
        let createTask: CreateTask = {groupID: this.groupID,title: this.title.value,name: this.name.value,description: this.description.value,priority: this.priority.value};
        this.submitEvent.emit(createTask);
        this.reset();
        this.isCreating = true;
        this.taskService.createTask(createTask).subscribe((value: any) => {
          this.isCreating = false;
          this.successEvent.emit(value);
        },(err: any) => {
          this.isCreating = false;
          this.failedEvent.emit(err)
        });
      }
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get title(): any {return this.formGroup.get("title")};
  get name(): any {return this.formGroup.get("name")};
  get description(): any {return this.formGroup.get("description")};
  get priority(): any {return this.formGroup.get("priority")};
}
