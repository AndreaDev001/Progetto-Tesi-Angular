import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '../../Utility/dropdown/dropdown.component';
import { ReportService } from 'src/model/services/report.service';
import { CollectionModel } from 'src/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-ban',
  templateUrl: './create-ban.component.html',
  styleUrls: ['./create-ban.component.css']
})
export class CreateBanComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    reason: new FormControl('',Validators.required)
  })
  public reasonOptions: DropdownOption[]= [];

  constructor(private reportService: ReportService) {

  }

  public ngOnInit(): void {
    this.reportService.getReasons().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let reasonOption: DropdownOption = {name: current,callback: () => {}};
          this.reasonOptions.push(reasonOption);
        })
      }
    })    
  }
}
