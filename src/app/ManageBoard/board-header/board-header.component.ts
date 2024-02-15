import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faGear, faHeart, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { TeamService } from 'src/app/team.service';
import { Board, CollectionModel, Task, TaskAssignment, Team } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.css']
})
export class BoardHeaderComponent implements OnInit {

  @Input() board: Board | undefined = undefined;
  public currentTeams: Team[] = [];
  public currentAssignments: TaskAssignment [] = [];
  public likeIcon: IconDefinition = faHeart;
  public teamsIcon: IconDefinition = faUserGroup;
  public inviteIcon: IconDefinition = faMessage;
  public optionIcon: IconDefinition = faGear;

  constructor(private teamService: TeamService,private taskAssignmentService: TaskAssignmentService) {

  }

  public ngOnInit(): void {
    if(this.board != undefined) {
      this.taskAssignmentService.getTaskAssignmentsByBoard(this.board.id).subscribe((value: CollectionModel) => {
        this.currentAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      })
      this.teamService.getTeamsByBoard(this.board.id).subscribe((value: CollectionModel) => {
        this.currentTeams = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      });
    }
  }
}
