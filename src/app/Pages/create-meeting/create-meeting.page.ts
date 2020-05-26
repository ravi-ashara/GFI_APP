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
      meeting_detail: '',
      request_sender: localStorage.userId,
      requested_by: localStorage.userId,
      ent_id: ''
    });
  }

  ionViewWillEnter() {
    this.eventListByCompany();
  }

  addParticipants(val: any) {
    this.selectedParticipants = [];
    setTimeout(() => {
      let val_1 = val.detail.value.map((item: any) => item.u_first_name + ' ' + item.u_last_name);
      this.selectedParticipants = val_1.toString();
    }, 500);
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
          this.setMinDate = moment().isSameOrBefore(this.selectedEventData.event_start_datetime, "D") == false ? moment().format('YYYY-MM-DD') : moment(this.selectedEventData.event_start_datetime).format('YYYY-MM-DD');
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
          request_receivers: this.createMeetingForm.value.request_receivers.map((item: any) => item.u_id)
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
    val.ent_id = val.event_id;
    val.request_receivers = val.request_receivers.map((item: any) => item.u_id);
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/send-meeting-request', val).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "success") {
            this.commonService.showToastWithDuration(response.msg, 'top', 3000);
            this.closeModal();
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
