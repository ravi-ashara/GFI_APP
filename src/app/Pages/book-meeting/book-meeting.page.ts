import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public formBuilder: FormBuilder) {
    this.modalData = this.navParam.get('value');
    console.log(this.modalData);
    this.bookMeetingForm = this.formBuilder.group({
      event: ['', Validators.required],
      date: ['', Validators.required],
      timeslots: ['', Validators.required],
      location: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  bookMeetingFunc(val: any) {
    console.log(val.value);
    this.closeModal();
  }
}
