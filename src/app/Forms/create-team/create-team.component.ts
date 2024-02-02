import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('name')
  })
  
  public ngOnInit(): void {
    
  }
}
