import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';
@Component({
  selector: 'app-book-meeting',
  templateUrl: './book-meeting.page.html',
  styleUrls: ['./book-meeting.page.scss'],
})
export class BookMeetingPage {
  modalData: any = '';
  public bookMeetingForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    public navParam: NavParams,
    public formBuilder: FormBuilder,
    private apiService: ApiCallService) {
    this.modalData = this.navParam.get('value');
    console.log(this.modalData);
    this.bookMeetingForm = this.formBuilder.group({
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

  closeModal() {
    this.modalCtrl.dismiss();
  }

  bookMeetingFunc(val: any) {
    console.log(val.value);
    this.closeModal();
    // try {
    //   this.apiService.showLoader();
    //   this.apiService.hitAPICall('post', 'event/send-meeting-request', val.value).subscribe((response: any) => {
    //     this.apiService.hideLoader();
    //   }, error => {
    //     this.apiService.hideLoader();
    //     this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    //   })
    // } catch (error) {
    //   this.apiService.hideLoader();
    //   this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    // }
  }
} 
