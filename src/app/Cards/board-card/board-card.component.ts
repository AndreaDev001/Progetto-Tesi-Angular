import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faList, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Board } from 'src/model/interfaces';
import { BoardRef } from 'src/model/refs';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit, OnChanges {

  @Input() board?: Board = undefined;
  @Input() boardRef?: BoardRef = undefined;
  public membersIcon: IconDefinition = faUserGroup;
  public listIcon: IconDefinition = faList;

  public ngOnInit(): void {
    
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['boardRef'] != undefined && this.boardRef != undefined) {
        this.board = {title: this.boardRef.title,description: this.boardRef.description,minMembers: this.boardRef.minMembers,maxMembers: this.boardRef.maxMembers,publisher: this.boardRef.publisher,amountOfMembers: this.boardRef.amountOfMembers,amountOfGroups: this.boardRef.amountOfGroups};
    }
  }
}
