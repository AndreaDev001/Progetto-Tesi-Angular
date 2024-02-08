import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { Discussion } from 'src/model/interfaces';

@Component({
  selector: 'app-discussion-options',
  templateUrl: './discussion-options.component.html',
  styleUrls: ['./discussion-options.component.css']
})
export class DiscussionOptionsComponent implements OnChanges {

  public userIcon: IconDefinition = faUser;
  public discussionIcon: IconDefinition = faMessage;
  
  public currentPublisherDiscussions: Discussion[] = [];
  public currentSimilarDiscussions: Discussion[] = [];
  
  public ngOnChanges(changes: SimpleChanges): void {
    
  }
}
