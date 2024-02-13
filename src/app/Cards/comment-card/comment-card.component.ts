import { Component, Input } from '@angular/core';
import { CommentRef } from 'src/model/refs';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent {
  @Input() commentRef: CommentRef | undefined = undefined;
}
