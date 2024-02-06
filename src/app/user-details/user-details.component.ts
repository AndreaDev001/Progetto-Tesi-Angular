import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faMessage, faPoll, faTable, faTasks } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/model/interfaces';

interface DescriptionItem
{
  icon: IconDefinition
  amount: number
  tooltip?: string
}
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User | undefined = undefined;
  public descriptionItems: DescriptionItem[] = [];
  public boardIcon: IconDefinition = faTable;
  public taskIcon: IconDefinition = faTasks;
  public discussionIcon: IconDefinition = faMessage;
  public pollIcon: IconDefinition = faPoll;
  
  public ngOnInit(): void {
    this.descriptionItems.push({amount: 0,icon: faTable});
    this.descriptionItems.push({amount: 0,icon: faTasks});
    this.descriptionItems.push({amount: 0,icon: faMessage});
    this.descriptionItems.push({amount: 0,icon: faPoll});
    this.descriptionItems.push({amount: 0,icon: faCheck})
  }
}
