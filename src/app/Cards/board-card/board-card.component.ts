import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faList, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Board } from 'src/model/interfaces';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.css']
})
export class BoardCardComponent implements OnInit {

  @Input() board?: Board = undefined;
  public membersIcon: IconDefinition = faUserGroup;
  public listIcon: IconDefinition = faList;

  public ngOnInit(): void {
    
  }
}
