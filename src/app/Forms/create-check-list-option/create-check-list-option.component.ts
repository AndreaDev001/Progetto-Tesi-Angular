import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CreateCheckList, CreateCheckListOption } from 'src/model/create';
import { CheckListOptionService } from 'src/model/services/check-list-option.service';

@Component({
  selector: 'app-create-check-list-option',
  templateUrl: './create-check-list-option.component.html',
  styleUrls: ['./create-check-list-option.component.css']
})
export class CreateCheckListOptionComponent {
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })
  public checkIcon: IconDefinition = faCheck;
  public isCreating: boolean = false;
  @Input() checkListID: any = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private checkListOptionService: CheckListOptionService) {

  }

  public ngOnInit(): void {
    
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.formGroup.valid && this.checkListID != undefined) {
      let createCheckListOption: CreateCheckListOption = {name: this.name.value,checkListID: this.checkListID};
      this.submitEvent.emit(createCheckListOption);
      this.isCreating = false;
      this.checkListOptionService.createOption(createCheckListOption).subscribe((value: any) => {
        this.isCreating = false;
        this.successEvent.emit(value);
      },(err: any) => {
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
