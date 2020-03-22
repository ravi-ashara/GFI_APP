import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage {
  currentSponsor: string = "Gold Sponsors";
  totalSponsor = ['Gold Sponsors', 'Silver Sponsors', 'Bronze Sponsors', 'Financial Supporters', 'Governmental Supporters', 'Cooperations', 'Media Coverage']
  constructor(public apicall: ApiCallService) { }

  segmentChanged(val: any) {
    console.log(val.detail.value);
  }
}
