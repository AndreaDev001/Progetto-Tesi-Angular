import { Component,EventEmitter,Input,Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { CreateCheckList } from 'src/model/create';
import { CheckListService } from 'src/model/services/check-list.service';

@Component({
  selector: 'app-create-check-list',
  templateUrl: './create-check-list.component.html',
  styleUrls: ['./create-check-list.component.css']
})
export class CreateCheckListComponent {
    
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  })
  public checkIcon: IconDefinition = faCheckCircle;
  @Input() taskID: any = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();
  public isCreating: boolean = false;


  constructor(private checkListService: CheckListService) {

  }

  public ngOnInit(): void {
    
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.formGroup.valid && this.taskID != undefined) {
      let createRequest: CreateCheckList = {name: this.name.value,taskID: this.taskID}
      this.submitEvent.emit(createRequest);
      this.isCreating = true;
      this.checkListService.createCheckList(createRequest).subscribe((value: any) => {
        this.isCreating = false;
        this.successEvent.emit(value)
      },(err: any) =>  {
        this.isCreating = false;
        this.failedEvent.emit(err)
      });
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name(): any {return this.formGroup.get("name")};
}
