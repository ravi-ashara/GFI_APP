import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage {
  modalData: any = '';
  createMeeting: boolean = false;
  public createMeetingForm: FormGroup;
  public eventListByCompanyData: any = [];
  constructor(
    private modalCtrl: ModalController,
    public navParam: NavParams,
    private formBuilder: FormBuilder,
    private apiService: ApiCallService) {
    this.modalData = this.navParam.get('value');
    console.log(this.modalData);
    this.createMeetingForm = this.formBuilder.group({
      event_id: ['', Validators.required],
      meeting_date: ['', Validators.required],
      timeslots: ['', Validators.required],
      location: ['', Validators.required],
      message: ['', Validators.required],
      request_sender: '',
      request_receivers: '',
      requested_by: '',
      start_time: '',
      end_time: '',
      ent_id: '',
    });
  }

  ionViewWillEnter() {
    this.eventListByCompany();
  }

  eventListByCompany() {
    try {
      const passData = {
        organization_id: this.modalData.organization_id
      }
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'organization/get-event-list-by-company', passData).subscribe((response: any) => {
        this.apiService.hideLoader();
        if (response.status === "success") {
          this.eventListByCompanyData = response.data;
        } else {
          this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
        }
      }, error => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }

  setMeetingData() {
    this.createMeeting = !this.createMeeting;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  bookMeeting(val: any) {
    try {
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'event/send-meeting-request', val.value).subscribe((response: any) => {
        this.apiService.hideLoader();
        console.log(response);
      }, error => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }
}
