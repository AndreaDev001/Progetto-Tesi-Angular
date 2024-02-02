import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownOption } from 'src/app/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { TaskService } from 'src/model/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  private currentPriorities: DropdownOption[] = [];
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',Validators.required),
    name: new FormControl<String>('',Validators.required),
    description: new FormControl<String>('',Validators.required),
    priority: new FormControl<String>('',Validators.required)
  })

  constructor(private taskService: TaskService) {

  }

  public ngOnInit(): void {
    this.taskService.getPriorities().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let priorityOption: DropdownOption = {name: current,callback: () => {}};
          this.currentPriorities.push(priorityOption);
        })
      }
    })
  }
}
