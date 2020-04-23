import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

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
  constructor(
    private modalCtrl: ModalController,
    public navParam: NavParams,
    private formBuilder: FormBuilder,
    public commonService: ApiCallService,
    private networkService: NetworkService) {
    this.modalData = this.navParam.get('value');
    this.loginUserDetails = JSON.parse(localStorage.loginUserData);

    console.log(this.modalData);
    console.log(this.loginUserDetails);

    this.createMeetingForm = this.formBuilder.group({
      event_id: ['', Validators.required],
      request_receivers: ['', Validators.required],
      meeting_date: ['', Validators.required],
      timeslots: ['', Validators.required],
      location: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: '',
      meeting_details: '',
      request_sender: this.modalData,
      requested_by: ''
    });
  }

  ionViewWillEnter() {
    this.eventListByCompany();
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
          event_id: val,
          organization_id: this.modalData.organization_id
        }

        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/get-user-list-by-event', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          this.userListByEvent = response;
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

  setMeetingData() {
    this.createMeeting = !this.createMeeting;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  bookMeeting(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'event/send-meeting-request', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          console.log(response);
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
