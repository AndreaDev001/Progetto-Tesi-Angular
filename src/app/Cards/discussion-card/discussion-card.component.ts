import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faComment, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { Discussion } from 'src/model/interfaces';
import { DiscussionRef } from 'src/model/refs';
import { DiscussionService } from 'src/model/services/discussion.service';

@Component({
  selector: 'app-discussion-card',
  templateUrl: './discussion-card.component.html',
  styleUrls: ['./discussion-card.component.css']
})
export class DiscussionCardComponent implements OnInit {
  @Input() discussion: Discussion | undefined = undefined;
  @Input() discussionRef: DiscussionRef | undefined = undefined;
  @Input() isOwner: boolean = false;
  @Output() deletedEvent: EventEmitter<any> = new EventEmitter();
  public likeIcon: IconDefinition = faHeart;
  public commentIcon: IconDefinition = faComment;
  public chatIcon: IconDefinition = faMessage;

  constructor(private router: Router,private discussionService: DiscussionService,public authHandlerService: AuthHandlerService) {

  }

  public ngOnInit(): void {
    if(this.discussionRef != undefined) 
        this.discussion = {title: this.discussionRef.title,topic: this.discussionRef.topic,id: this.discussionRef.id,createdDate: this.discussionRef.createdDate,publisher: this.discussionRef.publisher,amountOfReceivedLikes: this.discussionRef.amountOfLikes,amountOfReceivedComments: this.discussionRef.amountOfComments};
    if(this.discussion != undefined) {
      this.isOwner = this.authHandlerService.getCurrentUserID(true) == this.discussion?.publisher.id; 
    }
  }

  public openDiscussion(): void {
    if(this.discussion != undefined) {
      this.router.navigateByUrl('/discussion' + '/' + this.discussion.id);
    }
  }

  public deleteDiscussion(): void {
    if(this.discussion != undefined)
          this.discussionService.deleteDiscussion(this.discussion.id).subscribe((value: any) => {
            this.deletedEvent.emit();
        })
  }
}
