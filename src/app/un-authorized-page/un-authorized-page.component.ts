import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-un-authorized-page',
  templateUrl: './un-authorized-page.component.html',
  styleUrls: ['./un-authorized-page.component.css']
})
export class UnAuthorizedPageComponent {
  public errorIcon: IconDefinition = faWarning;
}
