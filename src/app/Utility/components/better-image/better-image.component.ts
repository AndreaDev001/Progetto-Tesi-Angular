import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-better-image',
  templateUrl: './better-image.component.html',
  styleUrls: ['./better-image.component.css']
})
export class BetterImageComponent implements OnInit {
  @Input() requiredSource: any = undefined;
  @Input() loaderStyle: any = {'display': 'flex','justify-content': 'center','align-items': 'center'};
  @Input() wrapperStyle: any = undefined;
  @Input() imageStyle: any = undefined;
  @Input() alternativeImage: any = undefined;
  public hasFailed: boolean = false;
  public isLoading: boolean = true;

  public ngOnInit(): void {
    this.reloadImage()
  }

  public updateLoading(value: boolean): any {
    this.isLoading = value;
  }

  public reloadImage(): void {
    let timeStamp = (new Date()).getTime();
    this.isLoading = true;
    this.requiredSource = this.requiredSource + "?" + "time=" + timeStamp;
  }
}
