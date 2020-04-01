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
  constructor(public apiService: ApiCallService) { }

  segmentChanged(val: any) {
    console.log(val.detail.value);
  }

  ionViewWillEnter() {
    this.showSponsors();
  }

  showSponsors() {
    try {
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'sponsor/list', '').subscribe((response: any) => {
        this.apiService.hideLoader();
        console.log(response);
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
