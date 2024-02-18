import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faGear, faHeart, faMessage, faPlus, faUser, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from 'src/app/Utility/dropdown/dropdown.component';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { TeamService } from 'src/model/services/team.service';
import { Board, BoardMember, CollectionModel, Task, TaskAssignment, Team } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';


interface TeamOption
{
  name: string,
  icon: IconDefinition
}
@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.css']
})
export class BoardHeaderComponent implements OnInit {

  @Input() board: Board | undefined = undefined;

  public likeIcon: IconDefinition = faHeart;
  public teamsIcon: IconDefinition = faUserGroup;
  public inviteIcon: IconDefinition = faMessage;
  public optionIcon: IconDefinition = faGear;

  public currentMembers: BoardMember[] = [];
  public currentTeams: Team[] = [];
  public currentTeamOptions: TeamOption[] = [];
  public plusIcon: IconDefinition = faPlus;

  @ViewChild("createTeamTemplate") createTeamTemplate: any;

  constructor(private teamService: TeamService,private boardMemberService: BoardMemberService,public alertHandlerService: AlertHandlerService) {

  }


  public ngOnInit(): void 
  {
    if(this.board != undefined) 
    {
      this.teamService.getTeamsByBoard(this.board.id).subscribe((value: CollectionModel) => {
        this.currentTeams = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentTeams.forEach((team: Team) => {
          this.currentTeamOptions.push({name: team.name,icon: faUsers});
        })
      });
      this.boardMemberService.getBoardMembersByBoard(this.board.id).subscribe((value: CollectionModel) => this.currentMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
    }
  }

  public handleSuccessTeam(value: Team): void
  {
    this.currentTeams.push(value);
    this.currentTeamOptions.push({icon: faUsers,name: value.name});
    this.alertHandlerService.close();
  }
  public handleCreateTeam(): any
  {
    this.alertHandlerService.setDefaultAlertTitle("");
    this.alertHandlerService.setTextTemplate(this.createTeamTemplate);
    this.alertHandlerService.clearOptions();
    this.alertHandlerService.open();
  }
}
