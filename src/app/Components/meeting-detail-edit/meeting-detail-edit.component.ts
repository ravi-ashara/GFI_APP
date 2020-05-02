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
    console.log(this.getMeetingData);
    this.meetingDetails = '';
  }

  updateMeetingDetails(val: any, meetingDetail: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          request_id: val.request_id,
          meeting_detail: meetingDetail,
          request_sender: val.request_sender
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/edit-meeting', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
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
