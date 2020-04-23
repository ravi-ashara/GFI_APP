import { Component, NgZone } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.page.html',
  styleUrls: ['./sponsor.page.scss'],
})
export class SponsorPage {
  currentSponsorIndex: number = 0;
  sposorDataValue: any = []
  totalSponsor: any = []
  constructor(
    public commonService: ApiCallService,
    private networkService: NetworkService) { }

  ionViewWillEnter() {
    this.showSponsors();
  }

  selectedTab(index: any) {
    this.sposorDataValue = this.totalSponsor.data[index];
  }

  openDetails(val: any) {
    console.log(val);
  }

  showSponsors() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'sponsor/list', '').subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status === "success") {
            this.totalSponsor = response;
            this.sposorDataValue = response.data[this.currentSponsorIndex];
          }
        }, error => {
          this.commonService.serverSideError();
        });
      } catch (error) {
        this.commonService.serverSideError();
      }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }
}
