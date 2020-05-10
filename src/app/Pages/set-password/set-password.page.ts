import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    public router: Router,
    private navCtrl: NavController) {
    if (this.router.getCurrentNavigation().extras.state) {
      if (this.router.getCurrentNavigation().extras.state.pageName) {
        this.showOTP = this.router.getCurrentNavigation().extras.state.pageName === "forgotPassword" ? true : false;
        this.showOldPassword = this.router.getCurrentNavigation().extras.state.pageName === "forgotPassword" ? false : true;
      }
    }

    this.setPasswordForm = this.formBuilder.group({
      u_oldpassword: this.showOldPassword ? ['', [Validators.required, Validators.minLength(6)]] : '',
      u_newpassword: ['', [Validators.required, Validators.minLength(6)]],
      u_confirmpassword: ['', [Validators.required]]
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('u_newpassword');
    const { value: confirmPassword } = formGroup.get('u_confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  checkOTP() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData: any = {
          val_otp: this.otp
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'check-otp', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          console.log(response);
          if (response.status == 'true') {
            this.showOTP = !this.showOTP;
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
    this.navCtrl.navigateBack(['settings']);
  }

  submitForm(val: any) {
    if (!this.showOldPassword) {
      delete val.value.u_oldpassword;
    }
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'changePassword', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          console.log(response);
          if (response.status == 'true') {
            if (this.showOldPassword) {
              this.backToPage();
            } else {
              this.navCtrl.navigateRoot(['login']);
            }
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
}
