import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

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

  public ngOnInit(): void {
    
  }
}
