import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import * as moment from 'moment';
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage {
  modalData: any = '';
  loginUserDetails: any = '';
  createMeeting: boolean = false;
  public createMeetingForm: FormGroup;
  public eventListByCompanyData: any = [];
  public userListByEvent: any = [];
  public selectedParticipants: any = [];
  public setMaxDate: any;
  public setMinDate: any;
  public selectedEventData: any;
  public userFreeSlots: any;
  constructor(
    private modalCtrl: ModalController,
    public navParam: NavParams,
    public formBuilder: FormBuilder,
    public commonService: ApiCallService,
    private networkService: NetworkService) {
    this.modalData = this.navParam.get('value');
    this.loginUserDetails = JSON.parse(localStorage.loginUserData);

    this.createMeetingForm = this.formBuilder.group({
      event_id: ['', Validators.required],
      request_receivers: ['', Validators.required],
      meeting_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: '',
      meeting_details: '',
      request_sender: this.modalData.u_id,
      requested_by: this.modalData.u_id,
      ent_id:''
    });
  }

  ionViewWillEnter() {
    this.eventListByCompany();
  }

  addParticipants(val: any) {
    let val_1 = val.target.textContent.trimStart();
    let val_2 = val_1.split(" ");
    for (let i = 0; i < val_2.length; i++) {
      if (i % 2 == 0) {
        this.selectedParticipants.push(val_2[i]);
      }
    }
    this.selectedParticipants.toString();
  }

  eventListByCompany() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData = {
          organization_id: this.modalData.organization_id
        }

        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'organization/get-event-list-by-company', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status === "success") {
            this.eventListByCompanyData = response.data;
          } else {
            this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
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

  getuserlistbyEvent(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData = {
          event_id: val.target.value,
          organization_id: this.modalData.organization_id
        }

        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/get-user-list-by-event', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          this.userListByEvent = response;
          const indx = this.eventListByCompanyData.events.findIndex(e => e.event_id == val.target.value);
          this.selectedEventData = this.eventListByCompanyData.events[indx];
          this.setMinDate = moment(this.selectedEventData.event_start_datetime).format('YYYY-MM-DD');
          this.setMaxDate = moment(this.selectedEventData.event_end_datetime).format('YYYY-MM-DD');
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

  getFreeSlote(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData = {
          event_id: this.selectedEventData.event_id,
          meeting_date: moment(val.target.value).format('YYYY-MM-DD'),
          request_sender: this.modalData.u_id,
          request_receivers: this.createMeetingForm.value.request_receivers
        }

        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/get-free-slote', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status === "success") {
            this.userFreeSlots = response.data;
          }
        }, error => {
          this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
        });
      } catch (error) {
        this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
      }
    }
  }

  setMeetingData() {
    this.createMeeting = !this.createMeeting;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  bookMeeting(val: any) {
    val.meeting_date = moment(val.meeting_date).format('YYYY-MM-DD');
    let splitData: any = val.start_time.split("-");
    val.start_time = splitData[0];
    val.end_time = splitData[1];
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/send-meeting-request', val).subscribe((response: any) => {
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
