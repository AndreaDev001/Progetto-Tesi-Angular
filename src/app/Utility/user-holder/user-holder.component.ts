import { Component, Input } from '@angular/core';
import { User } from 'src/model/interfaces';

@Component({
  selector: 'app-user-holder',
  templateUrl: './user-holder.component.html',
  styleUrls: ['./user-holder.component.css']
})
export class UserHolderComponent {
  @Input() user: User | undefined = undefined;
}
