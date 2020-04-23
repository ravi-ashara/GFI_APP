import { ApiCallService } from './../../Services/api-call/api-call.service';
import { Component } from '@angular/core';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(public commonService: ApiCallService,
    private networkService: NetworkService) { }

  logout() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      this.commonService.afterLogout();
    }
    else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }
}
