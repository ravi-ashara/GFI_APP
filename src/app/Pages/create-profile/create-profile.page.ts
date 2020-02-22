import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage {

  setStep: string = "step1";
  buttonName: string = '';
  constructor(private navCtrl: NavController) { }

  changeStap(val: any, val_buttonName: any) {
    this.setStep = val;
    this.buttonName = val_buttonName;
  }

  registerProfile() {
    localStorage.isLogin = true;
    this.navCtrl.navigateRoot(['/home']);
  }
}
