import { ApiCallService } from './../../Services/api-call/api-call.service';
import { Component } from '@angular/core';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public agendaList: any = [];
  constructor(public commonService: ApiCallService,
    private networkService: NetworkService) { }

  ionViewWillEnter() {
    this.showAgendaPDF();
  }

  showAgendaPDF() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'agenda/list', '').subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == 'success') {
            this.agendaList = response.data;
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
