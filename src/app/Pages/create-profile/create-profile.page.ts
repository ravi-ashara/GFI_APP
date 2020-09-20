import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { Router } from '@angular/router';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

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
  imagesPreview: any = {
    logo: '',
    pager_file: ''
  }

  setp1Data: any = {
    user_type: '',
    company_name: '',
    field: '',
    country: '',
    business_model: ''
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
    mobile: '',
    email: '',
    user_id: localStorage.userId
  }

  constructor(
    public commonService: ApiCallService,
    public router: Router,
    private networkService: NetworkService) {
    if (this.router.getCurrentNavigation().extras.state) {
      if (this.router.getCurrentNavigation().extras.state.itemData) {
        this.setStep = this.router.getCurrentNavigation().extras.state.itemData === "getOrganization" ? 'organization' : 'step1';
      }
    }
  }

  ionViewWillEnter() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
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
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  setOrganization() {
    if (this.selectOrganization === "other") {
      this.changeStep('step1', 'next');
      return false;
    }
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
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
            this.commonService.navigate_Root('home')
            this.commonService.commonUpdateUserDataEve();
          } else {
            this.commonService.showAlert('', 'Error form server side', 'Ok', () => { });
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

  changeStep(val: any, val_buttonName: any) {
    this.setStep = val;
    this.buttonName = val_buttonName;
  }

  registerProfile() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        let combineObj: any = { ...this.setp1Data, ...this.setp2Data, ...this.setp3Data }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'organization/add', combineObj).subscribe((response: any) => {
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
            this.navCtrl.navigateRoot(['/home']);
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
          this.setp2Data.logo = imageData
          this.imagesPreview.logo = "data:image/*;charset=utf-8;base64," + imageData;
        }
        else {
          this.setp2Data.pager_file = imageData
          this.imagesPreview.pager_file = "data:image/*;charset=utf-8;base64," + imageData;
        }
      }
    });
  }
}
