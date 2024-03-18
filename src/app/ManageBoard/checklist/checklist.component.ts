import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faClose } from '@fortawesome/free-solid-svg-icons';
import { AlertHandlerService } from 'src/app/Utility/services/alert-handler.service';
import { CheckList, CheckListOption, CollectionModel } from 'src/model/interfaces';
import { CheckListOptionService } from 'src/model/services/check-list-option.service';
import { CheckListService } from 'src/model/services/check-list.service';
import { UpdateCheckList, UpdateCheckListOption } from 'src/model/update';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit
{
  @Input() checkList: CheckList | undefined = undefined;
  public currentOptions: CheckListOption[] = [];
  public checkIcon: IconDefinition = faCheckCircle;
  public currentName: string | undefined = undefined;
  public removeIcon: IconDefinition = faClose;
  public currentOptionName: string | undefined = undefined;

  @ViewChild("createOptionTemplate") createOptionTemplate: any;

  constructor(private checkListOptionService: CheckListOptionService,private checkListService: CheckListService,public alertHandlerService: AlertHandlerService) {

  }

  public ngOnInit(): void {
    if(this.checkList != undefined) {
      this.currentName = this.checkList.name;
      this.checkListOptionService.getOptionsByCheckList(this.checkList.id).subscribe((value: CollectionModel) => {
        this.currentOptions = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      })
    }  
  }

  public addOption(): void {
    this.alertHandlerService.close();
    this.alertHandlerService.reset();
    this.alertHandlerService.setTextTemplate(this.createOptionTemplate);
    this.alertHandlerService.open();
  }
  public deleteOption(option: CheckListOption): void {
    this.checkListOptionService.deleteOption(option.id).subscribe((value: any) => {
      this.currentOptions = this.currentOptions.filter((current: any) => current.id !== option.id);
    });
  }

  public updateCheckList(event: any): void {
    if(event.target != undefined && this.checkList != undefined) {
      this.currentName = event.target.value;
      let updateCheckList: UpdateCheckList = {name: this.currentName,checkListID: this.checkList.id};
      this.checkListService.updateCheckList(updateCheckList).subscribe((value: any) => {
        this.currentName = value != undefined ? value : this.currentName;
      })
    }
  }

  public updateOptionName(event: any,option: CheckListOption): void {
    if(event.target != undefined) {
      let updateCheckListOption: UpdateCheckListOption = {name: event.target.value,optionID: option.id};
      this.checkListOptionService.updateOption(updateCheckListOption).subscribe((value: any) => {
        let index = this.currentOptions.indexOf(option);
        this.currentOptions[index] = value;
      })
    }
  }

  public updateOptionCompleted(event: any,option: CheckListOption): void {
    if(event.target != undefined) {
      let updateCheckListOption: UpdateCheckListOption = {completed: event.target.checked,optionID: option.id};
      this.checkListOptionService.updateOption(updateCheckListOption).subscribe((value: any) => {
        let index = this.currentOptions.indexOf(option);
        this.currentOptions[index] = value;
      })
    }
  }
}
