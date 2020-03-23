import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiCallService } from '../../Services/api-call/api-call.service';
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
    private apiService: ApiCallService) {
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
    if (this.checkstaySingIng.nativeElement.checked === true) {
      localStorage.isRemember = 'true';
    } else {
      localStorage.isRemember = 'false';
    }
    localStorage.loginDetails = JSON.stringify(val.value);
    try {
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'login', val.value).subscribe((response: any) => {
        this.apiService.hideLoader();
        if (response.status == "failed") {
          if (response.errors) {
            this.apiService.showAlert('', response.errors.u_email[0], 'Ok', () => { });
          } else {
            this.apiService.showAlert('', 'Invalid Password', 'Ok', () => { });
          }
        } else {
          localStorage.isLogin = true;
          this.navCtrl.navigateRoot(['/home']);
          localStorage.loginUserData = JSON.stringify(response.data);
          localStorage.token = response.data.token;
          localStorage.userId = response.data.u_id;
        }
      }, (error) => {
        this.apiService.hideLoader();
        this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.apiService.hideLoader();
      this.apiService.showAlert('', 'Error form server side', 'Ok', () => { });
    }
  }
}
