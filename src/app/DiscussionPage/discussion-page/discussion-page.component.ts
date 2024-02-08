import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.css']
})
export class DiscussionPageComponent {
  
  public discussionIcon: IconDefinition = faMessage;
  
  public ngOnInit(): void {
    
  }
}
