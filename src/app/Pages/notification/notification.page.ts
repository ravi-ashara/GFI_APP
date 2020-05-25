import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  notificationData: any = [];
  constructor(private commonService: ApiCallService,
    private networkService: NetworkService) {
    this.showNotificationList();
  }

  showNotificationList() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData = {
          user_id: localStorage.userId
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'push-notification/list', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "success") {
            this.notificationData = response.data
          } else {
            this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
          }
        }, error => {
          this.commonService.hideLoader();
          this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
        })
      } catch (error) {
        this.commonService.hideLoader();
        this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  deleteNotification(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      // try {
      //   this.commonService.showLoader();
      //   this.commonService.hitAPICall('post', '', '').subscribe((response: any) => {
      //     this.commonService.hideLoader();
      //   }, error => {
      //     this.commonService.hideLoader();
      //     this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      //   })
      // } catch (error) {
      //   this.commonService.hideLoader();
      //   this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      // }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  replyNotification() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      // try {
      //   this.commonService.showLoader();
      //   this.commonService.hitAPICall('post', '', '').subscribe((response: any) => {
      //     this.commonService.hideLoader();
      //   }, error => {
      //     this.commonService.hideLoader();
      //     this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      //   })
      // } catch (error) {
      //   this.commonService.hideLoader();
      //   this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      // }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  doRefresh(val: any) {
    setTimeout(() => {
      val.target.complete();
    }, 2000);
  }
}
