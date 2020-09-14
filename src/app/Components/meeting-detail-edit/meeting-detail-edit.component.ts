import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-meeting-detail-edit',
  templateUrl: './meeting-detail-edit.component.html',
  styleUrls: ['./meeting-detail-edit.component.scss'],
})
export class MeetingDetailEditComponent {

  getMeetingData: any = [];
  meetingDetails: string = '';
  constructor(private commonService: ApiCallService, private networkService: NetworkService, private popover: PopoverController, public navParams: NavParams) {
    this.getMeetingData = this.navParams.get('meetingVal');
    this.meetingDetails = this.getMeetingData.meeting_detail;
  }

  closePopup(val: any) {
    this.popover.dismiss(val);
  }

  updateMeetingDetails() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          request_id: this.getMeetingData.request_id,
          meeting_detail: this.meetingDetails,
          request_sender: this.getMeetingData.request_sender
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/edit-meeting', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "success") {
            this.closePopup('EditDetails');
            this.commonService.showToastWithDuration(response.msg, 'top', 3000);
          } else {
            this.commonService.showToastWithDuration("Error form server side", 'top', 3000);
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
