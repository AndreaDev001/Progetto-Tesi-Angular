import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChain, faCheck, faClockFour, faClose, faComments, faEllipsisVertical, faHeart, faHeartBroken, faIdCard, faImages, faLineChart, faMessage, faPaperclip, faPeopleGroup, faPlus, faTag, faTags, faTasks, faUpload, faUser, faUserGroup, faUsers, faWarning } from '@fortawesome/free-solid-svg-icons';
import { TagService } from 'src/model/services/tag.service';
import { Board, BoardMember, CheckList, CheckListOption, CollectionModel, Comment, Tag, TagAssignment, Task, TaskAssignment, TaskComment, TaskImage, TaskLike, TaskURL } from 'src/model/interfaces';
import { TaskAssignmentService } from 'src/model/services/task-assignment.service';
import { CheckListService } from 'src/model/services/check-list.service';
import { CheckListOptionService } from 'src/model/services/check-list-option.service';
import { TaskService } from 'src/model/services/task.service';
import { UpdateTask } from 'src/model/update';
import { AlertHandlerService } from 'src/app/services/alert-handler.service';
import { CreateTagAssignment, createTaskAssignment } from 'src/model/create';
import { TagAssignmentService } from 'src/model/services/tag-assignment.service';
import { BoardMemberService } from 'src/model/services/board-member.service';
import { TaskImageService } from 'src/model/services/task-image.service';
import { TextOverflowItem } from 'src/app/Utility/text-overflow/text-overflow.component';
import { TaskReportService } from 'src/model/services/task-report.service';
import { AuthHandlerService } from 'src/app/auth/auth-handler.service';
import { TaskLikeService } from 'src/model/services/task-like.service';
import { TeamService } from 'src/model/services/team.service';
import { TaskCommentService } from 'src/model/services/task-comment.service';
import { Subscription } from 'rxjs';
import { TaskURLService } from 'src/app/task-url.service';

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
export class TaskOverlayComponent implements OnInit,OnDestroy
{
  @Input() task: Task | undefined = undefined;
  @Input() board: Board | undefined = undefined;

  public taskIcon: IconDefinition = faTasks;
  public closeIcon: IconDefinition = faClose;
  public addIcon: IconDefinition = faPlus;
  public descriptionIcon: IconDefinition = faLineChart;
  public commentIcon: IconDefinition = faMessage;
  public buttonOptions: ButtonOption[] = [];

  public currentTags: Tag[] = [];
  public currentTagAssignments: TagAssignment[] = [];
  public currentComments: TaskComment[] = [];
  public currentCommentsItems: TextOverflowItem[] = [];
  public currentDescription: string | undefined = undefined;
  public currentMembers: TaskAssignment[] = [];
  public currentCheckLists: CheckList[] = [];
  public currentImages: TaskImage[] = [];
  public currentImagesItems: TextOverflowItem[] = [];
  public currentURLS: TaskURL[] = [];
  public currentURLSItems: TextOverflowItem[] = [];
  public isChangingDescription: boolean = false;


  public removeIcon: IconDefinition = faClose;
  public userIcon: IconDefinition = faUserGroup;
  public tagIcon: IconDefinition = faTags;
  public likeIcon: IconDefinition = faHeart;
  public unlikeIcon: IconDefinition = faHeartBroken;
  public reportIcon: IconDefinition = faWarning;
  public checkIcon: IconDefinition = faCheck;
  public uploadIcon: IconDefinition = faUpload;
  public optionsIcon: IconDefinition = faEllipsisVertical;
  public membersIcon: IconDefinition = faUsers;
  public teamIcon: IconDefinition = faPeopleGroup;
  public urlIcon: IconDefinition = faPaperclip;


  public isOwner: boolean = false;
  public currentNewTags: Tag[] = [];
  public currentNewMembers: BoardMember[] = [];
  public hasReported: boolean = false;
  public currentLike: TaskLike | undefined = undefined;
  public numbersOfLike: number = 0;
  public searchingChecklists: boolean = false;
  public searchingImages: boolean = false;
  public searchingComments: boolean = false;
  public searchingURLS: boolean = false;
  public currentName: any = undefined;
  public currentTitle: any = undefined;
  private subscriptions: Subscription[] = [];

  @ViewChild("addMemberTemplate") addMemberTemplate: any;
  @ViewChild("addTagTemplate") addTagTemplate: any;
  @ViewChild("addCommentTemplate") addCommentTemplate: any;
  @ViewChild("createTagTemplate") createTagTemplate: any;
  @ViewChild("createCheckListTemplate") createCheckListTemplate: any;
  @ViewChild("addImageTemplate") createImageTemplate: any;
  @ViewChild("addTeamTemplate") addTeamTemplate: any;
  @ViewChild("taskImageTemplate") taskImageTemplate: any;
  @ViewChild("createReportTemplate") createReportTemplate: any;
  @ViewChild("createURLTemplate") createURLTemplate: any;
  @ViewChild("commentTemplate") commentTemplate: any;
  @ViewChild("urlTemplate") urlTemplate: any;
  @Output() taskChanged: EventEmitter<any> = new EventEmitter();

  constructor(private taskAssignmentsService: TaskAssignmentService,private taskURLSService: TaskURLService,private authHandler: AuthHandlerService,public taskCommentService: TaskCommentService,public teamService: TeamService,private taskLikeService: TaskLikeService,private authenticationHandler: AuthHandlerService,private taskReportService: TaskReportService,private taskImageService: TaskImageService,public tagService: TagService,public alertHandlerService: AlertHandlerService,private taskService: TaskService,private checkListOptionService: CheckListOptionService,private tagAssignmentService: TagAssignmentService,private checkListService: CheckListService,public boardMemberService:  BoardMemberService) {

  }

  public ngOnInit(): void {
    if(this.task != undefined && this.board != undefined)
    {
      this.numbersOfLike = this.task.amountOfReceivedLikes;
      this.currentDescription = this.task.description;
      this.currentName = this.task.name;
      this.currentTitle = this.task.title;
      this.taskAssignmentsService.getTaskAssignmentsByTask(this.task.id).subscribe((value: CollectionModel) => {
        this.currentMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      });
      this.searchingChecklists = true;
      this.checkListService.getCheckListsByTask(this.task.id).subscribe((value: CollectionModel) => {
        this.searchingChecklists = false;
        if(value._embedded != undefined && value._embedded.content != undefined) {
          this.currentCheckLists = value._embedded.content;
        }
      })
      this.subscriptions.push(this.authHandler.getCurrentUserID(false).subscribe((value: any) => {
        if(this.task != undefined)
            this.isOwner = this.task.publisher.id == value;
      }));
      this.searchingImages = true;
      this.taskImageService.getImagesByTask(this.task.id).subscribe((value: CollectionModel) => {
        this.searchingImages = false;
        this.currentImages = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        for(let i = 0;i < this.currentImages.length;i++) {
          let overflowItem: TextOverflowItem = {context: this.currentImages[i],template: this.taskImageTemplate};
          this.currentImagesItems.push(overflowItem);
        }
      });
      this.taskReportService.hasReported(this.authenticationHandler.getCurrentUserID(true),this.task.id).subscribe((value: any) => {
        this.hasReported = true;
      },(err: any) => this.hasReported = false);
      this.taskLikeService.getTaskLikeBetween(this.task.id,this.authenticationHandler.getCurrentUserID(true)).subscribe((value: any) => {
        this.currentLike = value;
      },(err: any) => this.currentLike = undefined);
      this.searchingComments = true;
      this.taskCommentService.getCommentsByTask(this.task.id).subscribe((value: CollectionModel) => {
        if(value._embedded != undefined && value._embedded.content != undefined) {
          this.currentComments = value._embedded.content;
          value._embedded.content.forEach((current: any) => {
            let overflowItem: TextOverflowItem = {template: this.commentTemplate,context: current};
            this.currentCommentsItems.push(overflowItem);
          })
        }
        this.searchingComments = false;
      },(err: any) => this.searchingComments = false);
      this.tagService.getTagsByBoard(this.board.id).subscribe((value: CollectionModel) => this.currentTags = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
      this.tagAssignmentService.getTagAssignments(this.task.id).subscribe((value: CollectionModel) => this.currentTagAssignments = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : []);
      this.searchingURLS = true;
      this.taskURLSService.getTaskURLSByTask(this.task.id).subscribe((value: CollectionModel) => {
        this.searchingURLS = false;
        this.currentURLS = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
        value._embedded.content.forEach((current: any) => {
          let overflowItem: TextOverflowItem = {template: this.urlTemplate,context: current};
          this.currentURLSItems.push(overflowItem);
        })
      },(err: any) => this.searchingURLS = false);
    }
  }

  public ngOnDestroy(): void {
      this.subscriptions.forEach((value: Subscription) => value.unsubscribe());  
  }

  public deleteLike(): any {
    if(this.currentLike != undefined) {
      this.taskLikeService.deleteLike(this.currentLike.id).subscribe((value: any) => {
        this.currentLike = undefined;
        this.numbersOfLike--;
      })
    }
  }

  public updateCurrentDescription(event: any): any {
    this.currentDescription = event.target.value;
  }

  public removeComment(comment: TaskComment): any {
    this.currentComments = this.currentComments.filter((current: any) => current.id !== comment.id);
  }

  public createLike(): any {
    if(this.task != undefined) {
      this.taskLikeService.createTaskLike(this.task.id).subscribe((value: any) => {
          this.currentLike = value
          this.numbersOfLike++;
      },(err: any) => {
        this.currentLike = undefined
      });
    }
  }

  public createComment(event: any): any {
      this.currentComments.push(event);
      let overflowItem: TextOverflowItem = {template: this.commentTemplate,context: event};
      this.currentCommentsItems.push(overflowItem);
      this.alertHandlerService.close();
  }

  public updateDescription(): any {
    if(this.currentDescription != undefined && this.task != undefined) {
      this.isChangingDescription = false;
      let updateTask: UpdateTask = {taskID: this.task.id,description: this.currentDescription};
      this.taskService.updateTask(updateTask).subscribe((value: any) => {
        this.currentDescription = value.description;
        this.taskChanged.emit(this.task?.id);
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
      this.currentMembers= this.currentMembers.filter(current => current.id !== member.id);
      this.taskChanged.emit(this.task?.id);
    })
  }

  public deleteImage(image: TaskImage): void {
    const index = this.currentImages.indexOf(image);
    this.taskImageService.deleteImage(image.id).subscribe((value: any) => {
      this.taskChanged.emit(this.task?.id);
      this.currentImages = this.currentImages.filter((current: any) => current.id !== image.id);
      const overflowItem: TextOverflowItem = this.currentImagesItems[index];
      this.currentImagesItems = this.currentImagesItems.filter((current: any) => current !== overflowItem);
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
          this.taskChanged.emit(this.task?.id);
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
          this.tagAssignmentService.createTagAssignment(createTagAssignment).subscribe((currentValue: any) => {
            this.currentTagAssignments.push(currentValue)
            this.taskChanged.emit(this.task?.id);
          })
        }
        this.alertHandlerService.close();
      })
  }

  public updateImages(event: any): void {
    this.taskChanged.emit(this.task?.id);
    for(let i = 0;i < event._embedded.content.length;i++) {
      let current: any = event._embedded.content[i];
      this.currentImages.push(current);
      this.currentImagesItems.push({template: this.taskImageTemplate,context: current});
    }
    this.alertHandlerService.close();
  }


  public confirmTeams(event: any): void {
    if(this.task != undefined) {
      for(let current of event) {
        this.taskAssignmentsService.createTaskAssignmentFromTeam(this.task.id,current.id).subscribe((value: any) => {
          if(value._embedded != undefined && value._embedded.content != undefined) {
            value._embedded.content.forEach((newMember: any) => {
              this.currentMembers.push(newMember);
            })
          }
          this.taskChanged.emit(this.task?.id);
        })
      }
    }
  }

  public updateTask(event: any,name: boolean): void {
    if(this.task != undefined) {
      if(name)
        this.currentName = event.target.value != undefined ? event.target.value : this.currentName;
      else
        this.currentTitle = event.target.value != undefined ? event.target.value : this.currentTitle;
      let updateTask: UpdateTask = {taskID: this.task.id,name: this.currentName,title: this.currentTitle};
      this.taskService.updateTask(updateTask).subscribe((value: any) => {
        this.task = value;
        this.currentName = value.name;
        this.currentTitle = value.title;
        this.taskChanged.emit(this.task?.id);
      })
    }
  }

  public addMember(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setDefaultAlertTitle("Members");
    this.alertHandlerService.setDefaultAlertSubtitle("Assign a task to one of the avaliable members");
    this.alertHandlerService.setTextTemplate(this.addMemberTemplate);
    this.alertHandlerService.open();
  }

  public addComment(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.addCommentTemplate);
    this.alertHandlerService.open();
  }

  public addTeam(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setDefaultAlertTitle("Teams");
    this.alertHandlerService.setDefaultAlertSubtitle("Assign a team, all of it's members will be assigned to the task");
    this.alertHandlerService.setTextTemplate(this.addTeamTemplate);
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

  public createURL(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createURLTemplate);
    this.alertHandlerService.open();
  }

  public addReport(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createReportTemplate);
    this.alertHandlerService.open();
  }

  public removeTagAssignment(tagAssignment: TagAssignment): void {
    this.tagAssignmentService.deleteTagAssignment(tagAssignment.id).subscribe((value: any) => {
      this.currentTagAssignments = this.currentTagAssignments.filter(current => current.id !== tagAssignment.id);
      this.taskChanged.emit(this.task?.id);
    })
  }

  public removeCheckList(checkList: CheckList): void {
    this.checkListService.deleteCheckList(checkList.id).subscribe((value: any) => {
      this.currentCheckLists = this.currentCheckLists.filter(current => current.id !== checkList.id);
      this.taskChanged.emit(this.task?.id);
    })
  }

  public addNewImage(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createImageTemplate);
    this.alertHandlerService.open();
  }

  public createNewTag(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createTagTemplate);
    this.alertHandlerService.open();
  }

  public createNewCheckList(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createCheckListTemplate);
    this.alertHandlerService.open();
  }
}
