import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faComment, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Discussion } from 'src/model/interfaces';
import { DiscussionRef } from 'src/model/refs';

@Component({
  selector: 'app-discussion-card',
  templateUrl: './discussion-card.component.html',
  styleUrls: ['./discussion-card.component.css']
})
export class DiscussionCardComponent implements OnInit {
  @Input() discussion: Discussion | undefined = undefined;
  @Input() discussionRef: DiscussionRef | undefined = undefined;
  public likeIcon: IconDefinition = faHeart;
  public commentIcon: IconDefinition = faComment;
  public chatIcon: IconDefinition = faMessage;

  public ngOnInit(): void {
    if(this.discussionRef != undefined)
        this.discussion = {title: this.discussionRef.title,topic: this.discussionRef.topic,id: this.discussionRef.id,createdDate: this.discussionRef.createdDate,publisher: this.discussionRef.publisher,amountOfReceivedLikes: this.discussionRef.amountOfLikes,amountOfReceivedComments: this.discussionRef.amountOfComments};  
  }
}
