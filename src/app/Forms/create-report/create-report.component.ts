import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownOption } from 'src/app/dropdown/dropdown.component';
import { CollectionModel } from 'src/model/interfaces';
import { ReportService } from 'src/model/services/report.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl<String>('',Validators.required),
    description: new FormControl<String>('',Validators.required),
    reason: new FormControl<String>('',Validators.required)
  })
  public currentReasonsOptions: DropdownOption[] = [];

  constructor(private reportService: ReportService) {

  }

  public ngOnInit(): void {
    this.reportService.getReasons().subscribe((value: CollectionModel) => {
      if(value._embedded != null) {
        value._embedded.content.forEach((current: string) => {
          let reasonOption: DropdownOption = {name: current,callback: () => {}};
          this.currentReasonsOptions.push(reasonOption);
        })
      }
    })
  }
}
