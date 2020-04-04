import { Component, NgZone } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

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
    public apiService: ApiCallService) { }

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
    try {
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'sponsor/list', '').subscribe((response: any) => {
        this.apiService.hideLoader();
        if (response.status === "success") {
          this.totalSponsor = response;
          this.sposorDataValue = response.data[this.currentSponsorIndex];
        }
      }, error => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }
}
