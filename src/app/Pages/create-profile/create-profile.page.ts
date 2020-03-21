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
  setp1Data: any = {
    user_type: '',
    company_name: '',
    field: '',
    country: ''
  }
  setp2Data: any = {
    company_representative: '',
    title: '',
    logo: '',
    profile_pic: '',
    pager_file: '',
    company_description: '',
    website: '',
    no_of_emp: '',
    mobile: '',
  }

  setp3Data: any = {
    stage: '',
    raising: ''
  }
  constructor(private navCtrl: NavController) { }

  changeStap(val: any, val_buttonName: any) {
    if (val == "step2" && val_buttonName == "next") {
      console.log(this.setp1Data);
    } else if (val == "step3" && val_buttonName == "next") {
      console.log(this.setp2Data);
    }
    this.setStep = val;
    this.buttonName = val_buttonName;
  }

  registerProfile() {
    let combineObj = { ...this.setp1Data, ...this.setp2Data, ...this.setp3Data }
    console.log(combineObj);
  }
}
