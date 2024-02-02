import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent {

  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',Validators.required),
    description: new FormControl<String>('',Validators.required),
    minimumVotes: new FormControl<Number>(0,Validators.required),
    maximumVotes: new FormControl<Number>(0,Validators.required)
  })
}
