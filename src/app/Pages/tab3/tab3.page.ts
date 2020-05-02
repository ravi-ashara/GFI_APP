import { CreateMeetingPage } from './../create-meeting/create-meeting.page';
import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
// import * as moment from 'moment';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { MeetingDetailsPage } from '../meeting-details/meeting-details.page';
import { MeetingDetailEditComponent } from '../../Components/meeting-detail-edit/meeting-detail-edit.component';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  segmentSelectedValue: string = "Today"
  public fullEventsData: any = [];
  public getDataBySegmentSelected: any = [];
  constructor(
    public commonService: ApiCallService,
    private networkService: NetworkService,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private popoverController: PopoverController) { }

  ionViewWillEnter() {
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
            this.changeSegment();
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
      this.getDataBySegmentSelected = Object.entries(this.fullEventsData.past);
      console.log(this.getDataBySegmentSelected);
    }
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/profile_photo_icon.png";
  }

  showOptions(val: any) {
    // if (val.request_sender != localStorage.userId) {
    this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Delete Meeting',
        role: 'destructive',
        handler: () => {
          this.deleteMeeting(val);
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
      },
      {
        text: 'Edit Meeting',
        handler: () => {
          this.popoverController.create({
            component: MeetingDetailEditComponent,
            translucent: true,
            mode: 'ios',
            cssClass: 'meetingDetailsComponent',
            componentProps: { 'meetingVal': val }
          }).then((popover: any) => {
            popover.present();
          });
          // this.commonService.alertController.create({
          //   header: 'Edit Description',
          //   mode: 'ios',
          //   inputs: [
          //     {
          //       name: 'event_description',
          //       type: 'text',
          //       placeholder: 'Edit Description',
          //       value: val.events.event_description
          //     }
          //   ],
          //   buttons: [
          //     {
          //       text: 'Cancel',
          //       role: 'cancel',
          //       cssClass: 'secondary',
          //       handler: () => {

          //       }
          //     }, {
          //       text: 'Ok',
          //       handler: (val_input: any) => {
          //         this.updateMeetingDetails(val, val_input.event_description);
          //       }
          //     }
          //   ]
          // }).then((alert: any) => {
          //   alert.present();
          // });
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
    // } else {
    //   this.actionSheetController.create({
    //     mode: 'ios',
    //     buttons: [{
    //       text: 'Accept',
    //       handler: () => {
    //         this.acceptDeclineMeeting(val, 1);
    //       }
    //     }, {
    //       text: 'Decline',
    //       handler: () => {
    //         this.acceptDeclineMeeting(val, 2);
    //       }
    //     }, {
    //       text: 'View',
    //       handler: () => {
    //         this.modalCtrl.create({
    //           component: MeetingDetailsPage,
    //           componentProps: {
    //             value: val
    //           }
    //         }).then((modal: any) => {
    //           modal.present();
    //         });
    //       }
    //     }, {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     }]
    //   }).then((action_sheet: any) => {
    //     action_sheet.present();
    //   });
    // }
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
      this.commonService.deleteMeetingConfirmBox('Delete Meeting', 'Do you wish to delete this meeting?', (return_val: any) => {
        if (return_val == 'Delete') {
          try {
            const passData: any = {
              request_id: val.request_id
            }
            this.commonService.showLoader();
            this.commonService.hitAPICall('post', 'event/delete-meeting', passData).subscribe((response: any) => {
              this.commonService.hideLoader();
              if (response.status == "success") {
                this.commonService.showToastWithDuration(response.msg, 'top', 3000);
                this.showSchedule();
              } else {
                this.commonService.showToastWithDuration('Error form server side', 'top', 3000);
              }
            }, error => {
              this.commonService.serverSideError();
            });
          } catch (error) {
            this.commonService.serverSideError();
          }
        }
      });
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
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
