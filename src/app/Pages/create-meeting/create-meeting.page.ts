import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage {
  createMeeting: boolean = false;
  constructor(private modalCtrl: ModalController) { }

  setMeetingData() {
    this.createMeeting = !this.createMeeting;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
