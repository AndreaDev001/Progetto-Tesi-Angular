import { Component, Input, OnInit } from '@angular/core';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckToSlot, faHeart, faPoll } from '@fortawesome/free-solid-svg-icons';
import { Poll } from 'src/model/interfaces';
import { PollRef } from 'src/model/refs';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.css']
})
export class PollCardComponent implements OnInit {

  @Input() poll: Poll | undefined = undefined;
  @Input() pollRef: PollRef | undefined = undefined;
  public pollIcon: IconDefinition = faPoll;
  public likeIcon: IconDefinition = faHeart;
  public minVoteIcon: IconDefinition = faCheckToSlot;
  public maxVoteIcon: IconDefinition = faCheckToSlot;
  
  public ngOnInit(): void {
    if(this.pollRef != undefined)
      this.poll = {amountOfLikes: this.pollRef.amountOfLikes,id: this.pollRef.id,createdDate: this.pollRef.createdDate,minimumVotes: this.pollRef.minimumVotes,maximumVotes: this.pollRef.maximumVotes,publisher: this.pollRef.publisher,title: this.pollRef.title,description: this.pollRef.description}  
  }
}
