import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController } from '@ionic/angular';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public userImage: any = "";
  public registerForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public commonService: ApiCallService,
    public navCtrl: NavController,
    private networkService: NetworkService
  ) {
    this.registerForm = this.formBuilder.group({
      u_first_name: ['', Validators.required],
      u_last_name: ['', Validators.required],
      u_headline: '',
      u_gender: ['', Validators.required],
      u_about_us: '',
      u_personal_website: '',
      u_social_link: '',
      u_email: ['', Validators.email],
      u_password: ['', [Validators.required, Validators.minLength(6)]],
      profile_pic: '',
    });
  }

  submitForm(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      val.value.profile_pic = this.userImage;
      try {
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'registration', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "failed") {
            if (response.errors) {
              let errorsArray = Object.entries(response.errors);
              for (let i = 0; i < errorsArray.length; i++) {
                this.commonService.showAlert('', errorsArray[i][1][0], 'Ok', () => { });
              }
            }
          } else {
            this.commonService.showAlert('', response.msg, 'Ok', () => {
              this.navCtrl.navigateRoot(['/login']);
            });
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

  openImage() {
    this.commonService.openCamera('PHOTOLIBRARY', (imageData: any) => {
      if (imageData != 'Error') {
        this.userImage = imageData;
      }
    })
  }
}
