import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavigationExtras, Router } from '@angular/router';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('checkstaySingIng', { static: false }) checkstaySingIng;
  public loginForm: FormGroup;
  constructor(public formBuilder: FormBuilder,
    private navCtrl: NavController,
    public commonService: ApiCallService,
    private router: Router,
    private networkService: NetworkService) {
    this.loginForm = this.formBuilder.group({
      u_email: ['', Validators.email],
      u_password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ionViewWillEnter() {
    if (localStorage.isRemember === 'true') {
      const userDetails = JSON.parse(localStorage.getItem('loginDetails'));
      this.loginForm.patchValue(userDetails);
      this.checkstaySingIng.nativeElement.checked = true;
    }
  }

  submitForm(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      localStorage.isRemember = this.checkstaySingIng.nativeElement.checked === true ? 'true' : 'false';
      localStorage.loginDetails = JSON.stringify(val.value);
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'login', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "failed") {
            if (response.errors) {
              this.commonService.showAlert('', response.errors.u_email[0], 'Ok', () => { });
            } else {
              this.commonService.showAlert('', 'Invalid Password', 'Ok', () => { });
            }
          } else {
            if (response.data.organization === null) {
              const navigationExtras: NavigationExtras = {
                state: {
                  itemData: 'getOrganization',
                }
              };
              this.router.navigate(['create-profile'], navigationExtras);
            } else {
              this.navCtrl.navigateRoot(['/home']);
              localStorage.loginUserData = JSON.stringify(response.data);
              this.commonService.commonUpdateUserDataEve();
            }
            localStorage.isLogin = true;
            localStorage.token = response.data.token;
            localStorage.userId = response.data.u_id;
          }
        }, (error) => {
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
