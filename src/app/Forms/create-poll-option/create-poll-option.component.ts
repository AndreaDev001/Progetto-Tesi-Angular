import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Validators } from 'ngx-editor';
import {CreatePollOption} from 'src/model/create';
import { UpdatePollOption } from 'src/model/update';
import { PollOptionService } from 'src/model/services/poll-option.service';

@Component({
  selector: 'app-create-poll-option',
  templateUrl: './create-poll-option.component.html',
  styleUrls: ['./create-poll-option.component.css']
})
export class CreatePollOptionComponent implements OnInit {

  @Input() update: boolean = false;
  @Input() optionID: any = undefined;
  @Input() pollID: any = undefined;
  private searchingOption: boolean = false;
  public optionIcon: IconDefinition = faCircle;

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required(),Validators.minLength(3),Validators.maxLength(10)]),
    description: new FormControl('',[Validators.required(),Validators.minLength(3),Validators.maxLength(15)])
  })

  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private pollOptionService: PollOptionService) {
    
  }

  public ngOnInit(): void {
    if(this.optionID != undefined && this.update)
        this.getOption();
  }

  private getOption(): void {
    this.searchingOption = true;
    this.pollOptionService.getPollOptionByID(this.optionID).subscribe((value: any) => {
      this.searchingOption = false;
      this.formGroup.get("name")?.setValue(value.name);
      this.formGroup.get("description")?.setValue(value.description);
    },(err: any) => this.searchingOption = false);
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.description != undefined && this.formGroup.valid) {
      if(!this.update) {
        let createOption: CreatePollOption = {pollID: this.pollID,name: this.name.value,description: this.description.value};
        this.submitEvent.emit(createOption);
        this.reset();
        this.pollOptionService.createPollOption(createOption).subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
      }
      else
      {
        let updateOption: UpdatePollOption = {optionID: this.optionID,name: this.name.value,description: this.description.value};
        this.submitEvent.emit(updateOption);
        this.reset();
        this.pollOptionService.updatePollOption(updateOption).subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
      }
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name(): any {return this.formGroup.get("name")};
  get description(): any {return this.formGroup.get("description")};
}
