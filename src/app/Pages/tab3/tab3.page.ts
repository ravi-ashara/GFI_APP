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
  /*totalDays: any = [];
  currentDate: any = '';

  public meetings_Eventts: any = '';
  eventSource: any;
  viewTitle: string;
  selectedDate: any;
  calendar = {
    mode: 'month',
    currentDate: this.selectedDate ? this.selectedDate : new Date()
  };*/

  constructor(
    public commonService: ApiCallService,
    private networkService: NetworkService) { }

  ionViewWillEnter() {
    /*this.currentDate = moment().format('DD-MMM');
    this.calendar.currentDate = new Date();*/
    // this.showSchedule();
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

  /*onViewTitleChanged(title: any) {
    const currentDate = this.calendar.currentDate ? moment(this.calendar.currentDate).format("DD") : moment().format('DD');
    const fullDate = currentDate + ' ' + title;
    this.viewTitle = moment(fullDate).format('MMMM DD, YYYY');
  }

  onTimeSelected(ev: any) {
    this.viewTitle = moment(ev.selectedTime).format('MMMM DD, YYYY');
    this.meetings_Eventts = ev.events;
  }

  onCurrentDateChanged(event: Date) {
    let today = new Date(event);
    this.selectedDate = today;
  }*/

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
