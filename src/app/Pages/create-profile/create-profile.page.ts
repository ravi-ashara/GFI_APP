import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage {

  setStep: string = "organization";
  buttonName: string = '';
  organizationList: any = [];
  selectOrganization: any;
  setp1Data: any = {
    user_type: '',
    company_name: '',
    field: '',
    country: '',
    business_modal: ''
  }

  setp2Data: any = {
    company_representative: '',
    title: '',
    logo: '',
    pager_file: '',
    company_description: '',
    website: '',
    employee_range: '',
    sector: '',
    address: ''
  }

  setp3Data: any = {
    funding_stage: '',
    product_stage: '',
    past_investment: '',
    tiket_size: '',
    is_usd: '',
    mobile: ''
  }

  constructor(
    private navCtrl: NavController,
    public commonService: ApiCallService,
    public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      if (this.router.getCurrentNavigation().extras.state.itemData) {
        this.setStep = this.router.getCurrentNavigation().extras.state.itemData === "getOrganization" ? 'organization' : 'step1';
      }
    }
  }

  ionViewWillEnter() {
    try {
      this.commonService.hitAPICall('post', 'organization/list', '').subscribe((response: any) => {
        if (response.status === "success") {
          this.organizationList = response.data;
        } else {
          this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
        }
      });
    } catch (error) {
      this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }

  setOrganization() {
    if (this.selectOrganization === "other") {
      this.changeStep('step1', 'next');
      return false;
    }
    try {
      this.commonService.showLoader();
      let passData: any = {
        organization_id: this.selectOrganization,
        user_id: localStorage.userId
      }
      this.commonService.hitAPICall('post', 'organization/assign-user-rganization', passData).subscribe((response: any) => {
        this.commonService.hideLoader();
        if (response.status === "success") {
          this.organizationList = response.data;
          localStorage.loginUserData = JSON.stringify(response.data);
          this.navCtrl.navigateRoot(['/home']);
        } else {
          this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
        }
      }, error => {
        this.commonService.hideLoader();
        this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.commonService.hideLoader();
      this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }

  changeStep(val: any, val_buttonName: any) {
    if (val == "step1" && val_buttonName == "next") {

    } else if (val == "step2" && val_buttonName == "next") {
      console.log(this.setp1Data);
    } else if (val == "step3" && val_buttonName == "next") {
      console.log(this.setp2Data);
    }
    this.setStep = val;
    this.buttonName = val_buttonName;
  }

  registerProfile() {
    let combineObj: any = { ...this.setp1Data, ...this.setp2Data, ...this.setp3Data }
    console.log(combineObj);
  }

  getPhotos(val: any) {
    this.commonService.openCamera('PHOTOLIBRARY', (imageData: any) => {
      if (imageData !== "Error") {
        if (val == "Add company logo") {
          this.setp2Data.logo = imageData
        }
        else {
          this.setp2Data.pager_file = imageData
        }
      }
    });
  }
}
