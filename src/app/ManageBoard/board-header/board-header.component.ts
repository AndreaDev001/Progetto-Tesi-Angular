import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose, faEllipsis, faGear, faHeart, faMessage, faPlus, faUser, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from 'src/app/Utility/dropdown/dropdown.component';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { TeamService } from 'src/model/services/team.service';
import { Board, BoardMember, CollectionModel, Task, TaskAssignment, Team, TeamMember } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { CreateBoardInvite } from 'src/model/services/board-invite.service';
import { TeamMemberService } from 'src/app/team-member.service';
import { TextOverflowItem } from 'src/app/Utility/text-overflow/text-overflow.component';
import { BoardInviteService } from 'src/model/services/board-invite.service';


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
  public closeIcon: IconDefinition = faClose;

  public currentMembers: BoardMember[] = [];
  public currentTeams: Team[] = [];
  public currentTeamOptions: TeamOption[] = [];
  public plusIcon: IconDefinition = faPlus;

  public currentSelectedTeam: Team | undefined = undefined;
  public currentTeamMembers: TeamMember[] = [];
  public currentTeamMembersItem: TextOverflowItem[] = [];

  @ViewChild("createTeamTemplate") createTeamTemplate: any;
  @ViewChild("teamMemberItem") teamMemberItem: any;
  @ViewChild("teamListTemplate") teamListTemplate: any;
  @ViewChild("addUserTemplate") addUserTemplate: any;

  constructor(private teamService: TeamService,private teamMemberService: TeamMemberService,private boardMemberService: BoardMemberService,private boardInviteService: BoardInviteService,public alertHandlerService: AlertHandlerService) {

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

  public handleClickedTeam(team: any): any {
    this.currentSelectedTeam = team;
    this.alertHandlerService.setDefaultAlertTitle(team.name);
    this.alertHandlerService.setDefaultAlertSubtitle("View all of the members of the team" + " " + team.name);
    this.alertHandlerService.setTextTemplate(this.teamListTemplate);
    this.alertHandlerService.clearOptions();
    this.alertHandlerService.open();
    this.loadTeamMembers();
  }

  public loadTeamMembers(): any {
    this.currentTeamMembers = [];
    this.currentTeamMembersItem = [];
    if(this.currentSelectedTeam != undefined) {
      this.teamMemberService.getTeamMembersByTeam(this.currentSelectedTeam.id).subscribe((value: CollectionModel) => {
        this.currentTeamMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        this.currentTeamMembers.forEach((current: TeamMember) => {
          let textOverflowItem: TextOverflowItem = {context: current,template: this.teamMemberItem};
          this.currentTeamMembersItem.push(textOverflowItem);
        })
      })
    }
  }

  public removeTeam(team: any,index: number): any {
    this.teamService.deleteTeamByID(team.id).subscribe((value: any) => {
      this.currentTeamOptions = this.currentTeamOptions.splice(index,1);
    })
  }

  public createInvite(): void {
    this.alertHandlerService.clearOptions();
    this.alertHandlerService.setDefaultAlertTitle("Invite");
    this.alertHandlerService.setDefaultAlertSubtitle("Find an user to add to this board");
    this.alertHandlerService.setTextTemplate(this.addUserTemplate);
    this.alertHandlerService.open();
  }

  public createBoardInvite(event: any): void {
    if(this.board != undefined) {
      let createBoardInvite: CreateBoardInvite = {userID: event.id,boardID: this.board.id,text: "You have received an invite",expirationDate: "2030-05-12"};
      this.boardInviteService.createBoardInvite(createBoardInvite).subscribe((value: any) => {
        console.log(value);
        this.closeCreateInvite();
      },(err: any) => this.closeCreateInvite());
    }
  }

  public closeCreateInvite(): void {
    this.alertHandlerService.close();
  }

  public removeTeamMember(teamMemberID: any): any {
    this.teamMemberService.deleteTeamMember(teamMemberID).subscribe((value: any) => {
      this.alertHandlerService.close();
    },(err: any) =>  this.alertHandlerService.close());
  }
}
