import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { DropdownOption } from 'src/app/Utility/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { BoardService } from 'src/model/services/board.service';

export interface FormOption
{
  label: string,
  supportingText: string,
  placeholder: string,
  type: string
  changeCallback: () => void;
}
@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    description: new FormControl<String>('',[Validators.required,Validators.minLength(20),Validators.maxLength(200)]),
    maxMembers: new FormControl<Number>(0,[Validators.required,Validators.min(5),Validators.max(20)]),
    visibility: new FormControl<String>('',Validators.required)
  });
  public currentVisibilities: string[] = [];
  public boardIcon: IconDefinition = faTable;

  constructor(private boardService: BoardService) {

  }

  public ngOnInit(): void {
    this.boardService.getVisibilities().subscribe((value: CollectionModel) => {
      this.currentVisibilities = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    })
  }

  public handleSubmit(event:any): any {

  }

  public reset(): void {
    this.formGroup.reset();
  }

  get title(): any {return this.formGroup.get("title")};
  get description(): any {return this.formGroup.get("description")};
  get maxMembers(): any {return this.formGroup.get("maxMembers")};
  get visibility(): any {return this.formGroup.get("visibility")};
}
