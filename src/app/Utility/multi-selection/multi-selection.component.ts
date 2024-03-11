import { Component, EventEmitter, Output,Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-multi-selection',
  templateUrl: './multi-selection.component.html',
  styleUrls: ['./multi-selection.component.css']
})
export class MultiSelectionComponent implements OnInit
{
  public currentValues: any[] = [];
  public currentSelectedValues: any[] = [];
  public isSearching: boolean = false;
  @Input() showAlwaysButton: boolean = true;
  @Input() requiredObservable: any = undefined;
  @Input() requiredTemplate: any = undefined;
  @Input() selectedText: string = "Added";
  @Input() unselectedText: string = "Add";
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failEvent: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<any[]> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter();

  public ngOnInit(): void {
    this.searchValues();
  }

  public searchValues(): void {
    this.isSearching = true;
    this.requiredObservable.subscribe((value: any) => {
      this.isSearching = false;
      this.currentValues = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.successEvent.emit(value);
    },(err: any) => {
      this.isSearching = false;
      this.failEvent.emit(err);
    });
  }

  public updateCurrentValues(value: any): void {
    let index = this.currentSelectedValues.indexOf(value);
    if(index != -1) 
      this.currentSelectedValues = this.currentSelectedValues.filter((current: any) => current !== value);
    else
      this.currentSelectedValues.push(value);
    this.addEvent.emit(value);
    this.selectionChanged.emit(this.currentSelectedValues);
  }

  public confirmMembers(): void {
    this.confirmEvent.emit(this.currentSelectedValues);
    this.currentValues = [];
  }

  public cancel(): void {
    this.cancelEvent.emit();
  }
}
