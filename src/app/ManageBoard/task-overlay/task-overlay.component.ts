import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChain, faCheck, faClockFour, faClose, faIdCard, faLineChart, faMessage, faPlus, faTag, faTasks, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { TagService } from 'src/model/services/tag.service';
import { Board, BoardMember, CheckList, CheckListOption, CollectionModel, Tag, TagAssignment, Task, TaskAssignment } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { CheckListService } from 'src/model/services/check-list.service';
import { CheckListOptionService } from 'src/model/services/check-list-option.service';
import { TaskService } from 'src/model/services/task.service';
import { UpdateTask } from 'src/model/update';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { CreateTagAssignment, createTaskAssignment } from 'src/model/create';
import { TagAssignmentService } from 'src/app/tag-assignment.service';
import { BoardMemberService } from 'src/model/services/board-member.service';

interface ButtonOption
{
  name: string,
  icon: IconDefinition,
  callback: () => void;
}
@Component({
  selector: 'app-task-overlay',
  templateUrl: './task-overlay.component.html',
  styleUrls: ['./task-overlay.component.css']
})
export class TaskOverlayComponent implements OnInit 
{
  @Input() task: Task | undefined = undefined;
  @Input() board: Board | undefined = undefined;

  public taskIcon: IconDefinition = faIdCard;
  public closeIcon: IconDefinition = faClose;
  public addIcon: IconDefinition = faPlus;
  public descriptionIcon: IconDefinition = faLineChart;
  public commentIcon: IconDefinition = faMessage;
  public buttonOptions: ButtonOption[] = [];

  public currentTagAssignments: TagAssignment[] = [];
  public currentTags: Tag[] = [];
  public currentDescription: string | undefined = undefined;
  public currentMembers: TaskAssignment[] = [];
  public currentCheckLists: CheckList[] = [];
  public currentCheckListOptions: CheckListOption[] = [];
  public isChangingDescription: boolean = false;
  public removeIcon: IconDefinition = faClose;
  public userIcon: IconDefinition = faUserGroup;

  public currentNewTags: Tag[] = [];
  public currentNewMembers: BoardMember[] = [];

  @ViewChild("addMemberTemplate") addMemberTemplate: any;
  @ViewChild("addTagTemplate") addTagTemplate: any;
  @Output() taskChanged: EventEmitter<any> = new EventEmitter();

  constructor(private taskAssignmentsService: TaskAssignmentService,public tagService: TagService,public alertHandlerService: AlertHandlerService,private taskService: TaskService,private checkListOptionService: CheckListOptionService,private tagAssignmentService: TagAssignmentService,private checkListService: CheckListService,public boardMemberService:  BoardMemberService) {

  }

  public ngOnInit(): void {
    if(this.task != undefined && this.board != undefined)
    {
      this.currentDescription = this.task.description;
      this.taskAssignmentsService.getTaskAssignmentsByTask(this.task.id).subscribe((value: CollectionModel) => this.currentMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
      this.checkListService.getCheckListsByTask(this.task.id).subscribe((value: CollectionModel) => {
        if(value._embedded != undefined && value._embedded.content != undefined) {
          this.currentCheckLists = value._embedded.content;
          this.currentCheckLists.forEach((value: any) => {
            this.checkListOptionService.getOptionsByCheckList(value.id).subscribe((value: CollectionModel) => this.currentCheckListOptions = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
          })
        }
      })
      this.tagService.getTagsByBoard(this.board.id).subscribe((value: CollectionModel) => this.currentTags = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
      this.tagAssignmentService.getTagAssignments(this.task.id).subscribe((value: CollectionModel) => this.currentTagAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
    }
  }

  public updateCurrentDescription(event: any): any {
    this.currentDescription = event.target.value;
  }

  public updateDescription(): any {
    if(this.currentDescription != undefined && this.task != undefined) {
      this.isChangingDescription = false;
      let updateTask: UpdateTask = {taskID: this.task.id,description: this.currentDescription};
      this.taskService.updateTask(updateTask).subscribe((value: any) => {
        this.currentDescription = value.description;
        this.taskChanged.emit();
      })
    }
  }

  public resetDescription(): any {
    if(this.task != undefined) {
      this.currentDescription = this.task.description;
      this.isChangingDescription = false;
    }
  }

  public removeMember(member: TaskAssignment): void {
    this.taskAssignmentsService.deleteTaskAssignment(member.id).subscribe((value: any) => {
      this.taskChanged.emit();
      const requiredIndex = this.currentMembers.indexOf(member);
      this.currentMembers= this.currentMembers.filter(current => current.id !== member.id);
    })
  }

  public handleMembersChange(event: any): void {
    this.currentNewMembers = event;
  }
  public confirmMembersChange(event: any): void {
    this.currentNewMembers.forEach((value: BoardMember) => {
      if(this.task != undefined) {
        let createTaskAssignment: createTaskAssignment = {taskID: this.task.id,userID: value.user.id};
        this.taskAssignmentsService.createTaskAssignment(createTaskAssignment).subscribe((value: any) => {
          this.currentMembers.push(value);
        })
        this.alertHandlerService.close();
      }
    })
  }

  public handleTagsChange(event: any): void {
    this.currentNewTags = event;
  }

  public confirmTagsChange(event: any): void {
      this.currentNewTags.forEach((value: Tag) => {
        if(this.task != undefined) {
          let createTagAssignment: CreateTagAssignment = {taskID: this.task.id,tagID: value.id};
          console.log(createTagAssignment);
          this.tagAssignmentService.createTagAssignment(createTagAssignment).subscribe((currentValue: any) => {
            this.currentTagAssignments.push(currentValue)
          })
        }
        this.alertHandlerService.close();
      })
  }

  public addMember(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setDefaultAlertTitle("Members");
    this.alertHandlerService.setDefaultAlertSubtitle("Assign a task to one of the avaliable members");
    this.alertHandlerService.setTextTemplate(this.addMemberTemplate);
    this.alertHandlerService.open();
  }

  public addTag(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setDefaultAlertTitle("Tags");
    this.alertHandlerService.setDefaultAlertSubtitle("Choose one of the avaliable tags to add to this task");
    this.alertHandlerService.setTextTemplate(this.addTagTemplate);
    this.alertHandlerService.open();
  }
}
