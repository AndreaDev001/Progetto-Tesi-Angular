import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPoll } from '@fortawesome/free-solid-svg-icons';
import { min } from 'rxjs';
import { Poll } from 'src/model/interfaces';
import { PollService } from 'src/model/services/poll.service';
import { UpdatePoll } from 'src/model/update';


export interface CreatePoll
{
  title: string,
  description: string,
  minimumVotes: number,
  maximumVotes: number
  expirationDate: string,
}
@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

  @Input() update: boolean = false;
  @Input() pollID: any = undefined;
  public searchingPoll: boolean = false;
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    description: new FormControl<String>('',[Validators.required]),
    minimumVotes: new FormControl<Number>(0,[Validators.required,Validators.min(0),Validators.max(20)]),
    maximumVotes: new FormControl<Number>(0,[Validators.required,Validators.min(20),Validators.max(40)])
  })
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();
  public pollIcon: IconDefinition = faPoll;

  constructor(private pollService: PollService) {

  }

  public ngOnInit(): void {
    if(this.update != undefined && this.pollID != undefined) {
      this.getFormValues();
    }
  }

  public handleSubmit(event: any): void {
    if(this.formGroup.valid && this.title != undefined && this.description != undefined && this.minimumVotes != undefined && this.maximumVotes != undefined) {
      if(!this.update) {
        let createPoll: CreatePoll = {expirationDate: "2024-05-13",title: this.title.value,description: this.description.value,minimumVotes: this.minimumVotes.value,maximumVotes: this.maximumVotes.value};
        this.submitEvent.emit(createPoll);
        this.formGroup.reset();
        this.pollService.createPoll(createPoll).subscribe((value: Poll) => {
          this.successEvent.emit(value);
        },(err: any) => this.failedEvent.emit(err));
      }
      else
      {
        let updatePoll: UpdatePoll = {pollID: this.pollID,title: this.title.value,description: this.description.value,minimumVotes: this.minimumVotes.value,maximumVotes: this.maximumVotes.value};
        this.submitEvent.emit(updatePoll);
        this.formGroup.reset();
        this.pollService.updatePoll(updatePoll).subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
      }
    }
  }

  private getFormValues(): void {
    this.searchingPoll = true;
    this.pollService.getPollByID(this.pollID).subscribe((value: any) => {
      this.searchingPoll = false;
      this.formGroup.get("title")?.setValue(value.title);
      this.formGroup.get("description")?.setValue(value.description);
      this.formGroup.get("minimumVotes")?.setValue(value.minimumVotes);
      this.formGroup.get("maximumVotes")?.setValue(value.maximumVotes);
    },(err: any) => this.searchingPoll = false);
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get title(): any {return this.formGroup.get("title")};
  get description(): any {return this.formGroup.get("description")};
  get minimumVotes(): any {return this.formGroup.get("minimumVotes")};
  get maximumVotes(): any {return this.formGroup.get("maximumVotes")};
}
