import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit
{
  @Input() isSearching: boolean = false;
  @Input() requiredTemplate: any = undefined;
  @Input() context: any = undefined;
  @Input() diameter: any = '50';
  @Input() strokeWidth: any = '2';
  @Input() successTemplate: any = undefined;
  @Input() failedTemplate: any = undefined;
  @Input() loaderText: string = "Searching...";
  @Input() fontSize: number = 15;
  @Input() loaderSubtitle: string = "Searching for information, please wait";

  public ngOnInit(): void {
    
  }
}
