import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { DropdownOption } from '../../Utility/components/dropdown/dropdown.component';
import { ReportService } from 'src/model/services/report.service';
import { CollectionModel } from 'src/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { BanService } from 'src/model/services/ban.service';
import { CreateBan } from 'src/model/create';



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
  @Input() bannedID: string | undefined = undefined;
  public reasons: string[] = [];
  public banIcon: IconDefinition = faBan;
  public isCreating: boolean = false;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private reportService: ReportService,private banService: BanService) {

  }

  public ngOnInit(): void {
    this.reportService.getReasons().subscribe((value: CollectionModel) => {
      this.reasons = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
    })    
  }

  public handleSubmit(event: any): void {
    if(this.bannedID != undefined && this.title != undefined && this.description != undefined && this.reason != undefined && this.formGroup.valid) {
      let createBan: CreateBan = {bannedID: this.bannedID!!,title: this.title.value,description: this.description.value,reason: this.reason.value,expirationDate: "2024-05-15"};
      this.formGroup.reset();
      this.submitEvent.emit(createBan);
      this.isCreating = true;
      this.banService.createBan(createBan).subscribe((value: any) => {
        this.isCreating = false;
        this.successEvent.emit(value)
      },(err: any) => {
        this.isCreating = false;
        this.failedEvent.emit(err)
    });
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get title(): any {return this.formGroup.get("title")};
  get description(): any {return this.formGroup.get("description")};
  get reason(): any {return this.formGroup.get("reason")};
}
