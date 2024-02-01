import { Component, OnInit ,Input, EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit
{
  @Input() currentLabel?: string = undefined;
  @Input() currentSupportingText?: string = undefined;
  @Input() currentPlaceholder?: string = undefined;
  @Output() searchChanged: EventEmitter<String> = new EventEmitter();
  public currentValue?: string = undefined;

  public ngOnInit(): void {
    
  }

  public handleValueChange(event: any): void {
    let currentValue = event.target.value;
    this.currentValue = currentValue;
    this.searchChanged.emit(currentValue);
  }
}
