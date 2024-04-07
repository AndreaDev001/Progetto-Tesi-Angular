import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from 'src/model/services/team.service';
import { Team } from 'src/model/interfaces';

export interface CreateTeam
{
  name: string,
  boardID: string
}
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)])
  })
  public isCreating: boolean = false;
  @Input() boardID: string | undefined = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();
  public teamIcon: IconDefinition = faUsers;
  
  constructor(private teamService: TeamService) {

  }

  public ngOnInit(): void {
    
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.boardID != undefined && this.formGroup.valid) {
      let createTeam: CreateTeam = {name: this.name.value,boardID: this.boardID};
      this.submitEvent.emit(createTeam);
      this.reset();
      this.isCreating = true;
      this.teamService.createTeam(createTeam).subscribe((value: Team) => {
        this.isCreating = false;
        this.successEvent.emit(value)
      },(err: any) => {
        this.isCreating = false;
        this.failedEvent.emit(err)
      });
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name() {return this.formGroup.get("name")};
}
