import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from 'src/app/Utility/dropdown/dropdown.component';
import { BoardImageService } from 'src/app/board-image.service';
import { CreateBoardImage } from 'src/model/create';
import { Board, CollectionModel } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';
import { UpdateBoard } from 'src/model/update';

export interface CreateBoard
{
  title: string,
  description: string,
  maxMembers: number,
  visibility: string
}
@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  @Input() boardID: any = undefined;
  @Input() update: boolean = false;
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    description: new FormControl<String>('',[Validators.required,Validators.minLength(20),Validators.maxLength(200)]),
    maxMembers: new FormControl<Number>(0,[Validators.required,Validators.min(5),Validators.max(20)]),
    visibility: new FormControl<String>('PUBLIC',Validators.required)
  });
  public currentBoard: Board | undefined = undefined;
  public backgroundURL: string | undefined = undefined;
  public currentVisibilities: string[] = [];
  public boardIcon: IconDefinition = faTable;
  public currentImage: any = undefined;
  public currentSavedImage: any = undefined;
  public canDeleteImage: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private boardService: BoardService,private boardImageService: BoardImageService) {

  }

  public ngOnInit(): void {
    if(this.boardID != undefined) {
      let timeStamp = (new Date()).getTime();
      this.backgroundURL = "http://localhost:8080/api/v1/boardImages/public/image" + "/" + this.boardID + "?" + "time=" + timeStamp;
    }
    this.boardService.getVisibilities().subscribe((value: CollectionModel) => {
      this.currentVisibilities = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    })
    if(this.update) {
      this.boardService.getBoardById(this.boardID).subscribe((value: any) => {
        this.currentBoard = value;
        this.formGroup.get("title")?.setValue(this.currentBoard?.title);
        this.formGroup.get("description")?.setValue(this.currentBoard?.description);
        this.formGroup.get("maxMembers")?.setValue(this.currentBoard?.maxMembers);
        this.formGroup.get("visibility")?.setValue(this.currentBoard?.visibility);
      })
      this.boardImageService.getBoardImage(this.boardID).subscribe((value: any) => {
        if(value != undefined) {
          this.currentSavedImage = value;
          this.canDeleteImage = true;
        }
      })
    }
  }

  public handleSubmit(event:any): any {
    if(this.formGroup.valid && this.title != undefined && this.description != undefined && this.maxMembers != undefined && this.visibility != undefined) {
      if(!this.update) {
        let createBoard: CreateBoard = {title: this.title.value,description: this.description.value,maxMembers: this.maxMembers.value,visibility: this.visibility.value};
        this.submitEvent.emit(createBoard);
        this.formGroup.reset();
        this.boardService.createBoard(createBoard).subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
      }
      else if(this.boardID != undefined)
      {
        let updateBoard: UpdateBoard = {boardID: this.boardID,title: this.title.value,description: this.description.value,maxAmountOfMembers: this.maxMembers.value,visibility: this.visibility.value};
        this.submitEvent.emit(updateBoard);
        this.formGroup.reset();
        this.boardService.updateBoard(updateBoard).subscribe((value: any) =>{
          this.successEvent.emit(value);
          this.updateBackgroundImage();
        },(err: any) => this.failedEvent.emit(err));
      }
    }
  }
   

  public reset(): void {
    this.formGroup.reset();
  }

  public updateBackgroundImage(): void {
    if(this.currentImage != undefined) {
      let createBoardImage: CreateBoardImage = {boardID: this.boardID,file: this.currentImage};
      this.boardImageService.createBoardImage(createBoardImage).subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
    }
  }

  public updateCurrentImage(event: any): void {
    this.currentImage = event.target.files[0];
  }

  public deleteImage(): void {
    if(this.currentSavedImage.id != undefined) {
      this.boardImageService.deleteImage(this.currentSavedImage.id).subscribe((value: any) => {
        console.log(value);
      })
    }
  }

  get title(): any {return this.formGroup.get("title")};
  get description(): any {return this.formGroup.get("description")};
  get maxMembers(): any {return this.formGroup.get("maxMembers")};
  get visibility(): any {return this.formGroup.get("visibility")};
}
