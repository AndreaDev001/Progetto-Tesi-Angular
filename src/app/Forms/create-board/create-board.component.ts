import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DropdownOption } from 'src/app/dropdown/dropdown.component';
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

  private visibilityOptions: DropdownOption[] = [];

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl<String>('',Validators.required),
    description: new FormControl<String>('',Validators.required),
    maxMembers: new FormControl<Number>(0,Validators.required),
    visibility: new FormControl<String>('',Validators.required)
  });

  constructor(private boardService: BoardService) {

  }

  public ngOnInit(): void {
    this.boardService.getVisibilities().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let visibilityOption: DropdownOption = {name: current,callback: () => {}};
          this.visibilityOptions.push(visibilityOption);
        })
      }
    })
  }
}
