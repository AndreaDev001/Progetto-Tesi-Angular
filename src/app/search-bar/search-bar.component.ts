import { Component, OnInit ,Input, EventEmitter,Output} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  @Input() defaultValue?: String = undefined
  @Output() searchChanged: EventEmitter<String> = new EventEmitter();
  public currentValue?: string = undefined;
  public searchIcon: IconDefinition = faSearch;

  public ngOnInit(): void {
    
  }

  public handleValueChange(event: any): void {
    let currentValue = event.target.value;
    this.currentValue = currentValue;
    this.searchChanged.emit(currentValue);
  }
}
