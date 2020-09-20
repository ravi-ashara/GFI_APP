import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage {

  setPasswordForm: any;
  showOTP: boolean = true;
  otp: any = '';
  showOldPassword: boolean = false;
  constructor(public formBuilder: FormBuilder,
    public commonService: ApiCallService,
    private networkService: NetworkService,
    public router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      if (this.router.getCurrentNavigation().extras.state.pageName) {
        this.showOTP = this.router.getCurrentNavigation().extras.state.pageName === "forgotPassword" ? true : false;
        this.showOldPassword = this.router.getCurrentNavigation().extras.state.pageName === "forgotPassword" ? false : true;
      }
    }

    this.setPasswordForm = this.formBuilder.group({
      u_oldpassword: this.showOldPassword ? ['', [Validators.required, Validators.minLength(6)]] : '',
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      u_confirmpassword: ['', [Validators.required]],
      email: localStorage.forgotEmail
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('new_password');
    const { value: confirmPassword } = formGroup.get('u_confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  checkOTP() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          email: localStorage.forgotEmail,
          otp: this.otp
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'check-otp', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == 'success') {
            this.showOTP = !this.showOTP;
          } else {
            this.commonService.showToastWithDuration(response.msg, 'top', 3000);
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

  backToPage() {
    this.commonService.navigate_Back('settings');
  }

  submitForm(val: any) {
    if (!this.showOldPassword) {
      delete val.value.u_oldpassword;
    }
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'change-forgot-password', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == 'success') {
            this.commonService.showToastWithDuration(response.msg, 'top', 3000);
            if (this.showOldPassword) {
              this.backToPage();
            } else {
              this.commonService.navigate_Root('login');
            }
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

  ionViewWillLeave() {
    localStorage.removeItem('forgotEmail');
  }
}
