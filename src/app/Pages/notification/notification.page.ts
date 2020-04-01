import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  constructor(private apiService: ApiCallService) { }

  ionViewWillEnter() {

  }

  showNotificationList() {
    try {
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', '', '').subscribe((response: any) => {
        this.apiService.hideLoader();
      }, error => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      })
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }

  deleteNotification(val: any) {
    // try {
    //   this.apiService.showLoader();
    //   this.apiService.hitAPICall('post', '', '').subscribe((response: any) => {
    //     this.apiService.hideLoader();
    //   }, error => {
    //     this.apiService.hideLoader();
    //     this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    //   })
    // } catch (error) {
    //   this.apiService.hideLoader();
    //   this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    // }
  }

  replyNotification() {
    // try {
    //   this.apiService.showLoader();
    //   this.apiService.hitAPICall('post', '', '').subscribe((response: any) => {
    //     this.apiService.hideLoader();
    //   }, error => {
    //     this.apiService.hideLoader();
    //     this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    //   })
    // } catch (error) {
    //   this.apiService.hideLoader();
    //   this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    // }
  }
}
