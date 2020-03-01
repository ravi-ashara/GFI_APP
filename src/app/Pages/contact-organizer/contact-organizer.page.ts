import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-contact-organizer',
  templateUrl: './contact-organizer.page.html',
  styleUrls: ['./contact-organizer.page.scss'],
})
export class ContactOrganizerPage{

  constructor(public apicall: ApiCallService) { }

  presentPopover() {
    this.apicall.showPopover().then((val: any) => {
      console.log(val);
    });
  }

}
