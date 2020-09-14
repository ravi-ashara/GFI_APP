import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(public commonService: ApiCallService,
    private networkService: NetworkService,
    private router: Router) { }

  changePassword() {
    const navigationExtras: NavigationExtras = {
      state: {
        pageName: 'setPassword',
      }
    };
    this.router.navigate(['set-password'], navigationExtras);
  }

  logout() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      this.commonService.afterLogout();
    }
    else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }
}
