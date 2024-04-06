import { Component,EventEmitter,Input, OnChanges,Output, SimpleChanges} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSearchPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.component.html',
  styleUrls: ['./no-items.component.css']
})
export class NoItemsComponent implements OnChanges {

  @Input() missingButtonText?: string = "Retry";
  @Input() missingTitle?: string = "Empty";
  @Input() missingText?: string = "No items founds, set is empty";
  @Input() missingButtonStyle?: any = undefined;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchIcon: IconDefinition = faSearch;

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['missingButtonText'] != null)
        this.missingButtonText = this.missingButtonText != undefined ? this.missingButtonText : "Retry";
    if(changes['missingTitle'] != null)
        this.missingTitle = this.missingTitle != undefined ? this.missingTitle : "Empty";
    if(changes['missingText'] != null)
        this.missingText = this.missingText != undefined ? this.missingText : "No item founds, set is empty"
  }

  public handleClick(): void {
    this.buttonClicked.emit();
  }
}
