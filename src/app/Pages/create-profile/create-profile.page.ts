import { Component } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage {

  setStep: string = "step1";
  constructor() { }

  changeStap(val: any) {
    this.setStep = val;
  }

}
