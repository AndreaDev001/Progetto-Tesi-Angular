import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faList, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Board } from 'src/model/interfaces';
import { BoardRef } from 'src/model/refs';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {

  @Input() board?: Board = undefined;
  @Input() boardRef?: BoardRef = undefined;
  public membersIcon: IconDefinition = faUserGroup;
  public listIcon: IconDefinition = faList;

  constructor(public router: Router) {

  }

  public ngOnInit(): void {
    if(this.boardRef != undefined)
    {
      this.board = {amountOfMembers: this.boardRef.amountOfMembers,amountOfGroups: this.boardRef.amountOfGroups,id: this.boardRef.id,createdDate: this.boardRef.createdDate,title: this.boardRef.title,description: this.boardRef.description,publisher: this.boardRef.publisher};
    }
  }
  public openBoard(value: any): void {
    if(this.board != undefined) {
      this.router.navigateByUrl("/board/" + " " + this.board.id);
    }
  }
}
