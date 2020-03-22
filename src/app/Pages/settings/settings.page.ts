import { ApiCallService } from './../../Services/api-call/api-call.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(public apicall: ApiCallService) { }

  logout() {
    this.apicall.afterLogout();
  }
}
