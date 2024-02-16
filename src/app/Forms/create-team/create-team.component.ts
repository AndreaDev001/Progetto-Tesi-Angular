import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from 'src/app/team.service';

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
    name: new FormControl('name')
  })
  @Input() boardID: string | undefined = undefined;
  public teamIcon: IconDefinition = faUsers;
  
  constructor(private teamService: TeamService) {

  }

  public ngOnInit(): void {
    
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.boardID != undefined && this.formGroup.valid) {
      let createTeam: CreateTeam = {name: this.name.value,boardID: this.boardID};
      this.teamService.createTeam(createTeam).subscribe((value: any) => console.log(value));
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name() {return this.formGroup.get("name")};
}
