import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  totalDays: any = [];
  currentDate: any = '';
  constructor(private apiService: ApiCallService) { }

  ionViewWillEnter() {
    this.totalDays = this.enumerateDaysBetweenDates(moment().startOf('week'), moment().endOf('week'));
    this.currentDate = moment().format('DD-MMM');
  }

  showSchedule() {
    try {
      let passData: any = {
        user_id: localStorage.userId
      }
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'user/meeting-request-list', passData).subscribe((response: any) => {
        this.apiService.hideLoader();
      }, error => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
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
    try {
      const passData: any = {
        meeting_slote_id: val.MeetingSlotId,
        user_id: val.UserId,
        status: meetingStatus == 'Accept' ? 1 : 0
      }
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'event/change-request-accept-declien-status', passData).subscribe((response: any) => {
        this.apiService.hideLoader();
        console.log('Response =>', response);
      }, error => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      })
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }
}
