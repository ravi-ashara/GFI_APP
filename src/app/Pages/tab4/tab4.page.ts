import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  companyData: any = [];

  constructor(public commonService: ApiCallService,
    private networkService: NetworkService) { }

  ionViewWillEnter() {
    this.showCompanies();
  }

  showCompanies() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'organization/list', '').subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "success") {
            this.companyData = response.data;
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

  createnewList(val: any) {
    console.log(val);
  }

  gotoChatList(val: any) {
    console.log(val);
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/company-placeholder.jpg";
  }
}
