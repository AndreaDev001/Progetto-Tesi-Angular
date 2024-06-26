import { Component, OnInit,Input, EventEmitter,Output, OnChanges,SimpleChanges} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface DropdownOption
{
    name: string,
    icon?: IconDefinition
    callback: () => void;
}
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {

  @Input() currentOptions: DropdownOption[] = [];
  @Input() currentLabel?: string = undefined;
  @Input() currentSupportingText?: string = undefined;
  @Input() defaultValue?: String = undefined;
  @Output() changedCurrent: EventEmitter<String> = new EventEmitter<String>();
  public currentSelectedOption?: String = undefined;


  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentOptions'] != undefined && this.currentSelectedOption == undefined) {
      this.currentSelectedOption = changes['currentOptions'].currentValue[0];
    }
  }

  public handleClick(item: DropdownOption): void {
    this.currentSelectedOption = item.name;
    this.changedCurrent.emit(item.name);
    item.callback();
  }
}
