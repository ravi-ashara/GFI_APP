import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
// import * as moment from 'moment';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { MeetingDetailsPage } from '../meeting-details/meeting-details.page';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  segmentSelectedValue: string = "Today"
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
  public fullEventsData: any = [];
  public getDataBySegmentSelected: any = [];
  constructor(
    public commonService: ApiCallService,
    private networkService: NetworkService,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    /*this.currentDate = moment().format('DD-MMM');
    this.calendar.currentDate = new Date();*/
    this.showSchedule();
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
          if (response.status == 'success') {
            this.fullEventsData = response.data;
            this.getDataBySegmentSelected = this.fullEventsData.today;
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

  changeSegment() {
    if (this.segmentSelectedValue == 'Today') {
      this.getDataBySegmentSelected = this.fullEventsData.today;
    } else if (this.segmentSelectedValue == 'Upcoming') {
      this.getDataBySegmentSelected = this.fullEventsData.upcomming;
    } else {
      // this.getDataBySegmentSelected = this.fullEventsData;
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

  showOptions(val: any) {
    if (val.is_owner == true) {
      this.actionSheetController.create({
        mode: 'ios',
        buttons: [{
          text: 'Delete Meeting',
          role: 'destructive',
          handler: () => {
            // this.deleteMeeting(val);
          }
        }, {
          text: 'View',
          handler: () => {
            this.modalCtrl.create({
              component: MeetingDetailsPage,
              componentProps: {
                value: val
              }
            }).then((modal: any) => {
              modal.present();
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      }).then((action_sheet: any) => {
        action_sheet.present();
      });
    } else {
      this.actionSheetController.create({
        mode: 'ios',
        buttons: [{
          text: 'Accept',
          handler: () => {
            // this.acceptDeclineMeeting(val,1);
          }
        }, {
          text: 'Decline',
          handler: () => {
            // this.acceptDeclineMeeting(val,2);
          }
        }, {
          text: 'View',
          handler: () => {
            this.modalCtrl.create({
              component: MeetingDetailsPage,
              componentProps: {
                value: val
              }
            }).then((modal: any) => {
              modal.present();
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      }).then((action_sheet: any) => {
        action_sheet.present();
      });
    }
  }

  acceptDeclineMeeting(val: any, meetingStatus: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          meeting_slote_id: val.id,
          user_id: val.user_id,
          status: meetingStatus
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

  deleteMeeting(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          meeting_slote_id: val.MeetingSlotId,
          user_id: val.UserId
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/delete-meeting', passData).subscribe((response: any) => {
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
