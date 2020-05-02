import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage {
  userData: any = {};
  showEditProfileForm: boolean = false;
  segmentSelectedValue: string = 'Personal';
  registerForm: FormGroup;
  setStep: string = "step1";
  buttonName: string = '';

  organizationForm: FormGroup;

  constructor(public commonService: ApiCallService,
    public formBuilder: FormBuilder,
    public networkService: NetworkService) {
    this.userData = this.commonService.getUserLoginData();
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
      u_id: ''
    });

    this.organizationForm = this.formBuilder.group({
      user_type: ['', Validators.required],
      company_name: ['', Validators.required],
      country: ['', Validators.required],
      field: ['', Validators.required],
      business_model: ['', Validators.required],

      company_representative: ['', Validators.required],
      title: ['', Validators.required],
      logo: this.userData ? this.userData.organization.logo_url : 'assets/images/icon_add_photo_on_two_step.png',
      pager_file: this.userData ? this.userData.organization.pager_file : 'assets/images/icon_add_photo_on_two_step.png',
      company_description: ['', Validators.required],
      website: ['', Validators.required],
      employee_range: '',
      sector: ['', Validators.required],
      address: ['', Validators.required],

      funding_stage: ['', Validators.required],
      product_stage: ['', Validators.required],
      past_investment: '',
      tiket_size: '',
      is_usd: '',
      email: ['', Validators.email],
      mobile: ['', Validators.required],
      user_id: localStorage.userId,
      id: '',
    });
  }

  ionViewWillEnter() {
    this.organizationForm.patchValue(this.userData.organization);
    this.registerForm.patchValue(this.userData);
  }

  toggleEditProfile() {
    this.showEditProfileForm = !this.showEditProfileForm;
    this.segmentSelectedValue = 'Personal';
    this.setStep = "step1";
    this.buttonName = '';
  }

  submitRegisterForm(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'user/edit-profile', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "failed") {
            this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
          } else {
            this.commonService.commonUpdateUserDataEve();
          }
        }, error => {
          this.commonService.serverSideError();
        });
      } catch (error) {
        this.commonService.serverSideError();
      }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
    console.log(val.value);
    this.toggleEditProfile();
  }

  changeStep(val: any, val_buttonName: any) {
    this.setStep = val;
    this.buttonName = val_buttonName;
  }

  registerProfile(val: any) {
    // this.toggleEditProfile();
    console.log(val.value);

    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'organization/edit', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "failed") {
            if (response.errors) {
              let errorsArray = Object.entries(response.errors);
              for (let i = 0; i < errorsArray.length; i++) {
                this.commonService.showAlert('', errorsArray[i][1][0], 'Ok', () => { });
              }
            }
          } else {
            localStorage.loginUserData = JSON.stringify(response.data);
            this.commonService.commonUpdateUserDataEve();
          }
        }, error => {
          this.commonService.serverSideError();
        });
      } catch (error) {
        this.commonService.serverSideError();
      }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  getPhotos(val: any) {
    this.commonService.openCamera('PHOTOLIBRARY', (imageData: any) => {
      if (imageData !== "Error") {
        if (val == "Add company logo") {
          console.log(imageData);
          this.organizationForm.get('logo').setValue(imageData);
        }
        else if (val == "Add one pager") {
          console.log(imageData);
          this.organizationForm.get('pager_file').setValue(imageData);
        } else {
          console.log(imageData);
          // this.registerForm.controls["profile_pic"].setValue(imageData);
          this.registerForm.get('profile_pic').setValue(imageData);
        }
      }
    });
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/profile_photo_icon.png";
  }
}
