import { Component, EventEmitter, Input, OnInit,ViewChild,Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClose, faEllipsis, faGear, faHeart, faMessage, faPlus, faUser, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { TeamService } from 'src/model/services/team.service';
import { Board, BoardMember, CollectionModel, Task, TaskAssignment, Team, TeamMember, User } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { CreateBoardInvite } from 'src/model/services/board-invite.service';
import { TextOverflowItem } from 'src/app/Utility/components/text-overflow/text-overflow.component';
import { BoardInviteService } from 'src/model/services/board-invite.service';
import { RoleOwnerService } from 'src/model/services/role-owner.service';
import { CreateRoleOwner, CreateTeamMember } from 'src/model/create';
import { UserService } from 'src/model/services/user.service';
import { TeamMemberService } from 'src/model/team-member.service';
import { Router } from '@angular/router';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';


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
  @Input() isAdmin: boolean = false;
  @Input() isBoardAdmin: boolean = false;

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
  public currentSelectedNewMembers: BoardMember[] = [];
  public currentTeamMembers: TeamMember[] = [];
  public currentTeamMembersItem: TextOverflowItem[] = [];

  public currentUserAdmin: boolean = false;
  public currentInvitedUser: User | undefined = undefined;
  public searchingTeamMembers: boolean = false;
  public searchingMember: boolean = false;
  public searchingBoardMembers: boolean = false;
  public searchingTeams: boolean = false;


  @ViewChild("createInviteTemplate") createInviteTemplate: any;
  @ViewChild("createTeamTemplate") createTeamTemplate: any;
  @ViewChild("teamMemberItem") teamMemberItem: any;
  @ViewChild("teamListTemplate") teamListTemplate: any;
  @ViewChild("addUserTemplate") addUserTemplate: any;
  @ViewChild("addMemberTemplate") addMemberTemplate: any;
  @ViewChild("modifyBoardTemplate") modifyBoardTemplate: any;
  
  @Output("usersChanged") usersChanged: EventEmitter<any> = new EventEmitter();
  @Output("teamsChanged") teamsChanged: EventEmitter<any> = new EventEmitter();
  @Output("modifiedBoard") modifiedBoard: EventEmitter<any> = new EventEmitter();

  constructor(private teamService: TeamService,public userService: UserService,public authHandlerService: AuthHandlerService,private router: Router,private roleOwnerService: RoleOwnerService,public teamMemberService: TeamMemberService,public boardMemberService: BoardMemberService,private boardInviteService: BoardInviteService,public alertHandlerService: AlertHandlerService) {

  }


  public ngOnInit(): void 
  {
    if(this.board != undefined) 
    {
      this.searchBoardMembers();
      this.searchTeams();
    }
  }

  private searchTeams(): void {
    this.searchingTeams = true;
    this.teamService.getTeamsByBoard(this.board!!.id).subscribe((value: CollectionModel) => {
      this.searchingTeams = false;
      this.currentTeams = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.currentTeams.forEach((team: Team) => {
        this.currentTeamOptions.push({name: team.name,icon: faUsers});
      })
    },(err: any) => this.searchingTeams = false);
  }

  private searchBoardMembers(): void {
    this.searchingBoardMembers = true;
    this.boardMemberService.getBoardMembersByBoard(this.board!!.id).subscribe((value: CollectionModel) => {
      this.searchingBoardMembers = false;
      this.currentMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []
    },(err: any) => this.searchingBoardMembers = false);
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
    this.alertHandlerService.setDefaultAlertSubtitle("");
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
        this.alertHandlerService.close()
      },(err: any) => this.alertHandlerService.close());
    }
  }


  public updateInvitedUser(event: any): void {
    this.currentInvitedUser = event
    if(this.currentInvitedUser != undefined) 
    {
      this.alertHandlerService.reset();
      this.alertHandlerService.setTextTemplate(this.createInviteTemplate);
      this.alertHandlerService.open();
    }
  }

  public updateAdmin(member: BoardMember): void {
    if(this.board != undefined) {
      this.currentUserAdmin = false;
      this.searchingMember = true;
      this.roleOwnerService.hasRole('ADMIN',member.user.id,this.board.id).subscribe((value: any) => {
        this.currentUserAdmin = value != undefined;
        this.searchingMember = false;
      },(err: any) => this.searchingMember = false);
    }
  }

  public removeFromBoard(member: BoardMember): void {
    if(this.board != undefined) {
      this.boardMemberService.deleteMember(member.id).subscribe((value: any) => {
        this.currentMembers = this.currentMembers.filter((current: any) => current.id !== member.id);
        this.usersChanged.emit();
      })
    }
  }

  public deleteTeamMembers(event: any): void {
    this.alertHandlerService.close();
    for(let current of event) {
      this.teamMemberService.deleteTeamMember(current.id).subscribe((value: any) => {
        this.teamsChanged.emit();
      })
    }
  }

  public addTeamMember(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setDefaultAlertTitle("Add a member");
    this.alertHandlerService.setDefaultAlertSubtitle("Choose one of the avaliable members");
    this.alertHandlerService.setTextTemplate(this.addMemberTemplate);
    this.alertHandlerService.open();
  }

  public modifyOptions(): void {
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.modifyBoardTemplate);
    this.alertHandlerService.open();
  }

  public changeRole(member: BoardMember): void {
    console.log(member.user.id);
    console.log(member.board.id);
    if(this.currentUserAdmin)
      this.roleOwnerService.deleteRoleOwner("ADMIN",member.user.id,member.board.id).subscribe((value: any) => this.currentUserAdmin = false);
    else
    {
      let createRoleOwner: CreateRoleOwner = {name: "ADMIN",userID: member.user.id,boardID: member.board.id};
      this.roleOwnerService.createRoleOwner(createRoleOwner).subscribe((value: any) => this.currentUserAdmin = true);
    }
  }
  

  public handleSelectionChange(event: any): void {
    this.currentSelectedNewMembers = event;
  }

  public confirmTeamMembers(): void {
    if(this.currentSelectedNewMembers.length > 0 && this.currentSelectedTeam != undefined) {
      for(let current of this.currentSelectedNewMembers) {
        let createTeamMember: CreateTeamMember = {teamID: this.currentSelectedTeam.id,userID: current.user.id};
        this.teamMemberService.createTeamMember(createTeamMember).subscribe((value: any) => console.log(value));
      }
      this.currentSelectedNewMembers = [];
    }
    this.alertHandlerService.close();
  }

  public openProfile(member: any): void {
    this.router.navigateByUrl('/user/' + member.user.id);
  }
}
