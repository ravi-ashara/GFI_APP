import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-conference-book',
  templateUrl: './conference-book.page.html',
  styleUrls: ['./conference-book.page.scss'],
})
export class ConferenceBookPage {

  constructor(public apicall: ApiCallService) { }

  presentPopover() {
    this.apicall.showPopover().then((val: any) => {
      console.log(val);
    });
  }
}
