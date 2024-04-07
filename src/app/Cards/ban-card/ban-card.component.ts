import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faBan, faClockFour } from '@fortawesome/free-solid-svg-icons';
import { Ban } from 'src/model/interfaces';
import { BanService } from 'src/model/services/ban.service';

@Component({
  selector: 'app-ban-card',
  templateUrl: './ban-card.component.html',
  styleUrls: ['./ban-card.component.css']
})
export class BanCardComponent {

  @Input() ban: Ban | undefined = undefined;

  public banIcon: IconDefinition = faBan;
  public clockIcon: IconDefinition = faClockFour;
  public calendarIcon: IconDefinition = faCalendarDays;

  @Output() deleteBanEvent: EventEmitter<any> = new EventEmitter();

  constructor(private banService: BanService) {

  }

  public deleteBan(): void {
    if(this.ban != undefined) {
      this.banService.deleteBan(this.ban.id).subscribe((value: any) => {
        this.deleteBanEvent.emit();
      })
    }
  }
}
