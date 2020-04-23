import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  constructor(private commonService: ApiCallService) { }

  ionViewWillEnter() {

  }

  showNotificationList() {
    try {
      this.commonService.showLoader();
      this.commonService.hitAPICall('post', '', '').subscribe((response: any) => {
        this.commonService.hideLoader();
      }, error => {
        this.commonService.hideLoader();
        this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      })
    } catch (error) {
      this.commonService.hideLoader();
      this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }

  deleteNotification(val: any) {
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
  }

  replyNotification() {
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
  }
}
