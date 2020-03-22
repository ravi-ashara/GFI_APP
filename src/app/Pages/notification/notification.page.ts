import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  constructor(public apicall: ApiCallService) { }

}
