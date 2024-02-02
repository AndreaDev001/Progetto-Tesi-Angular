import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.component.html',
  styleUrls: ['./create-discussion.component.css']
})
export class CreateDiscussionComponent {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    topic: new FormControl('',Validators.required)
  })
}
