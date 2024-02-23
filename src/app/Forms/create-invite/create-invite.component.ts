import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMailForward } from '@fortawesome/free-solid-svg-icons';
import { BoardInvite, User } from 'src/model/interfaces';
import { BoardInviteService } from 'src/model/services/board-invite.service';
import { CreateBoardInvite } from 'src/model/services/board-invite.service';

@Component({
  selector: 'app-create-invite',
  templateUrl: './create-invite.component.html',
  styleUrls: ['./create-invite.component.css']
})
export class CreateInviteComponent {
  public formGroup: FormGroup = new FormGroup({
    text: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  })
  @Input() boardID: any = undefined;
  @Input() user: User | undefined = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();

  public inviteIcon: IconDefinition = faMailForward;

  constructor(private boardInviteService: BoardInviteService) {

  }

  public handleSubmit(event: any): void {
    if(this.user != undefined && this.boardID != undefined) 
    {
      if(this.formGroup.valid && this.text != undefined)
      {
        let createInvite: CreateBoardInvite = {userID: this.user.id,text: this.text.value,boardID: this.boardID,expirationDate: "2030-12-05"};
        this.submitEvent.emit(createInvite);
        this.formGroup.reset();
        this.boardInviteService.createBoardInvite(createInvite).subscribe((value: BoardInvite) => {
          this.successEvent.emit(value);
        },(err: any) => this.failedEvent.emit(err));
      }
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get text(): any {return this.formGroup.get("text")};
}
