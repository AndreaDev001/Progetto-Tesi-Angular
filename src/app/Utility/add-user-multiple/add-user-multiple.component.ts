import { Component, OnInit , Input, EventEmitter,Output} from '@angular/core';
import { BoardMember, CollectionModel } from 'src/model/interfaces';
import { BoardMemberService } from 'src/model/services/board-member.service';

@Component({
  selector: 'app-add-user-multiple',
  templateUrl: './add-user-multiple.component.html',
  styleUrls: ['./add-user-multiple.component.css']
})
export class AddUserMultipleComponent implements OnInit {

  @Input() boardID: string | undefined = undefined;
  public currentMembers: BoardMember[] = [];
  public currentSelectedMembers: BoardMember[] = [];
  @Input() unselectedText: string = "Add";
  @Input() selectedText: string = "Added";
  @Output() selectedMemberEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedMembersChanged: EventEmitter<BoardMember[]> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor(private boardMemberService: BoardMemberService) {

  }

  public ngOnInit(): void {
    if(this.boardID != undefined) {
      this.boardMemberService.getBoardMembersByBoard(this.boardID).subscribe((value: CollectionModel) => {
        this.currentMembers = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      })
    }
  }

  public updateCurrentSelectedMembers(member: BoardMember): void {
    this.currentSelectedMembers.push(member);
    this.selectedMemberEvent.emit(member);
    this.selectedMembersChanged.emit(this.currentSelectedMembers);
  }

  public confirmMembers(): void {
    this.confirmEvent.emit(this.currentSelectedMembers);
    this.currentSelectedMembers = [];
  }
}
