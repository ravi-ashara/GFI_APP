import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.page.html',
  styleUrls: ['./meeting-details.page.scss'],
})
export class MeetingDetailsPage {
  public modalData: any;
  public loginUserID: any;
  public pageName: string = '';
  constructor(private modalCtrl: ModalController,
    private navParam: NavParams,
    public commonService: ApiCallService,
    private networkService: NetworkService) {
    this.loginUserID = localStorage.userId;
    this.pageName = this.navParam.get('pageName');
    if (this.pageName == "MySchedule") {
      this.modalData = this.navParam.get('value');
    } else if (this.pageName == "MySchedule_Notification") {
      this.showMeetingDetails(this.navParam.get('value'));
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/profile_photo_icon.png";
  }

  showMeetingDetails(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        let passData: any = {
          request_id: val
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'user/view-meeting-details', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status === "success") {
            this.modalData = response.data;
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
