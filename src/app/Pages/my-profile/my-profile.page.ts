import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage {
  userData: any = {};
  showEditProfileForm: boolean = false;
  userImage: any = '';
  segmentSelectedValue: string = 'Personal';
  registerForm: FormGroup;
  setStep: string = "step1";
  buttonName: string = '';

  constructor(public commonService: ApiCallService,
    public formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      u_first_name: ['', Validators.required],
      u_last_name: ['', Validators.required],
      u_headline: '',
      u_gender: ['', Validators.required],
      u_about_us: '',
      u_personal_website: '',
      u_social_link: '',
      u_email: ['', Validators.email],
      profile_pic: '',
    });
  }

  ionViewWillEnter() {
    this.userData = this.commonService.getUserLoginData();
  }

  toggleEditProfile() {
    this.showEditProfileForm = !this.showEditProfileForm;
    this.segmentSelectedValue = 'Personal';
    this.setStep = "step1";
    this.buttonName = '';
  }

  openImage() {
    this.commonService.openCamera('PHOTOLIBRARY', (imageData: any) => {
      if (imageData != 'Error') {
        this.userImage = imageData;
      }
    });
  }

  submitRegisterForm(val: any) {
    console.log(val);
    this.toggleEditProfile();
  }

  changeStep(val: any, val_buttonName: any) {
    this.setStep = val;
    this.buttonName = val_buttonName;
  }

  registerProfile() {
    this.toggleEditProfile();
  }

  getPhotos(val: any) {
    this.commonService.openCamera('PHOTOLIBRARY', (imageData: any) => {
      if (imageData !== "Error") {
        if (val == "Add company logo") {
          console.log(imageData)
        }
        else {
          console.log(imageData)
        }
      }
    });
  }
}
