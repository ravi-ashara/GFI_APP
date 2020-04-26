import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.page.html',
  styleUrls: ['./meeting-details.page.scss'],
})
export class MeetingDetailsPage {
  public modalData: any;
  constructor(private modalCtrl: ModalController,
    private navParam: NavParams) {
    this.modalData =this.navParam.get('value');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
