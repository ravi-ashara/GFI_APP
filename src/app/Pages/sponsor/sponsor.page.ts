import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage {

  constructor(public apicall: ApiCallService) { }

  presentPopover() {
    this.apicall.showPopover().then((val: any) => {
      console.log(val);
    });
  }

}
