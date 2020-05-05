import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.page.html',
  styleUrls: ['./meeting-details.page.scss'],
})
export class MeetingDetailsPage {
  public modalData: any;
  public loginUserID: any;
  constructor(private modalCtrl: ModalController,
    private navParam: NavParams) {
    this.loginUserID = localStorage.userId;
    this.modalData = this.navParam.get('value');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/profile_photo_icon.png";
  }
}
