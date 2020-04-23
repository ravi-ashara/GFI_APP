import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import * as moment from 'moment';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  totalDays: any = [];
  currentDate: any = '';
  constructor(
    public commonService: ApiCallService,
    private networkService: NetworkService) { }

  ionViewWillEnter() {
    this.totalDays = this.enumerateDaysBetweenDates(moment().startOf('week'), moment().endOf('week'));
    this.currentDate = moment().format('DD-MMM');
  }

  showSchedule() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        let passData: any = {
          user_id: localStorage.userId
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'user/meeting-request-list', passData).subscribe((response: any) => {
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

  enumerateDaysBetweenDates(startDate: any, endDate: any) {
    let date = []
    while (moment(startDate) <= moment(endDate)) {
      date.push(startDate);
      startDate = moment(startDate).add(1, 'days');
    }
    return date;
  }

  segmentChanged(val: any) {
    console.log(val.detail.value);
  }

  acceptDeclienMeeting(val: any, meetingStatus: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          meeting_slote_id: val.MeetingSlotId,
          user_id: val.UserId,
          status: meetingStatus == 'Accept' ? 1 : 0
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/change-request-accept-declien-status', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          console.log('Response =>', response);
        }, error => {
          this.commonService.serverSideError();
        })
      } catch (error) {
        this.commonService.serverSideError();
      }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }
}
