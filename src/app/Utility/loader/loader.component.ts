import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit
{
  @ViewChild("defaultLoaderTemplate") defaultLoaderTemplate: any;
  @Input() currentTitle: string = "Searching";
  @Input() currentText: string = "Searching results, please wait...";

  constructor(private spinner: NgxSpinnerService) {

  }

  public ngOnInit(): void {
    this.spinner.show();
  }
}
