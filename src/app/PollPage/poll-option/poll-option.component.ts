import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faMedal } from '@fortawesome/free-solid-svg-icons';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { PollOption } from 'src/model/interfaces';
import { PollOptionService } from 'src/model/services/poll-option.service';
import { PollVoteService } from 'src/model/services/poll-vote.service';

@Component({
  selector: 'app-poll-option',
  templateUrl: './poll-option.component.html',
  styleUrls: ['./poll-option.component.css']
})
export class PollOptionComponent {

  @Input() pollOption: PollOption | undefined = undefined;
  @Input() isOwner: boolean = false;
  @Input() isVoted: boolean = false;

  @Output() deletedEvent: EventEmitter<any> = new EventEmitter();
  @Output() votedEvent: EventEmitter<any> = new EventEmitter();

  public optionIcon: IconDefinition = faCheckToSlot;
  public medalIcon: IconDefinition = faMedal;

  @ViewChild("modifyOptionTemplate") modifyOptionTemplate: any;

  constructor(private pollOptionService: PollOptionService,private pollVoteService: PollVoteService,public alertHandlerService: AlertHandlerService) {

  }

  public modifyOption(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.modifyOptionTemplate);
    this.alertHandlerService.open();
  }

  public deleteOption(): void {
    if(this.pollOption != undefined) {
      this.pollOptionService.deletePollOption(this.pollOption.id).subscribe((value: any) => {
        this.deletedEvent.emit();
      });
    }
  }

  public voteOption(): void {
    if(this.pollOption != undefined) {
      this.pollVoteService.createVote(this.pollOption.id).subscribe((value: any) => {
        this.isVoted = true;
        this.votedEvent.emit(this.pollOption!!.id);
      },(err: any) => this.isVoted = false);
    }
  }
}
