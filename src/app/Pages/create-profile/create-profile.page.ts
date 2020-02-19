import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage {

  setStep: string = "step1";
  constructor(private navCtrl: NavController) { }

  changeStap(val: any) {
    this.setStep = val;
  }

  registerProfile() {
    localStorage.isLogin = true;
    this.navCtrl.navigateRoot(['/tabs/tab1']);
  }
}
