import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faHeart, faPoll } from '@fortawesome/free-solid-svg-icons';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Poll } from 'src/model/interfaces';
import { PollRef } from 'src/model/refs';
import { PollService } from 'src/model/services/poll.service';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css']
})
export class PollCardComponent implements OnInit {

  @Input() poll: Poll | undefined = undefined;
  @Input() pollRef: PollRef | undefined = undefined;
  @Output() deletedEvent: EventEmitter<any> = new EventEmitter();
  public isOwner: boolean = false;
  public pollIcon: IconDefinition = faPoll;
  public likeIcon: IconDefinition = faHeart;
  public minVoteIcon: IconDefinition = faCheckToSlot;
  public maxVoteIcon: IconDefinition = faCheckToSlot;
  
  constructor(private router: Router,private pollService: PollService,public authHandler: AuthHandlerService) {

  }
  
  public ngOnInit(): void {
    if(this.pollRef != undefined)
      this.poll = {amountOfReceivedLikes: this.pollRef.amountOfLikes,id: this.pollRef.id,createdDate: this.pollRef.createdDate,minimumVotes: this.pollRef.minimumVotes,maximumVotes: this.pollRef.maximumVotes,publisher: this.pollRef.publisher,title: this.pollRef.title,description: this.pollRef.description};
    if(this.poll != undefined) {
      this.isOwner = this.poll.publisher.id == this.authHandler.getCurrentUserID(true);
    }
  }

  public openPoll(): void {
    if(this.poll != undefined) {
      this.router.navigateByUrl("/poll" + "/" + this.poll.id);
    }
  }

  public deletePoll(): void {
    if(this.poll != undefined) {
      this.pollService.deletePoll(this.poll.id).subscribe((value: any) => {
        this.deletedEvent.emit();
      })
    }
  }
}
