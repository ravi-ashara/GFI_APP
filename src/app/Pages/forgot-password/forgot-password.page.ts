import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  forgotPasswordForm: any;
  constructor(public formBuilder: FormBuilder,
    public commonService: ApiCallService,
    private networkService: NetworkService,
    private router: Router) {
    this.forgotPasswordForm = this.formBuilder.group({
      u_email: ['', Validators.email],
    });
  }

  submitForm(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'forgotPassword', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          console.log(response);
          if (response.status == 'true') {
            const navigationExtras: NavigationExtras = {
              state: {
                pageName: 'forgotPassword',
              }
            };
            this.router.navigate(['set-password'], navigationExtras);
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
