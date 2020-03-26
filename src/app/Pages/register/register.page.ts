import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController } from '@ionic/angular';

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
    public apiService: ApiCallService,
    public navCtrl: NavController
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
    val.value.profile_pic = this.userImage;
    try {
      this.apiService.showLoader();
      this.apiService.hitAPICall('post', 'registration', val.value).subscribe((response: any) => {
        this.apiService.hideLoader();
        if (response.status == "failed") {
          if (response.errors) {
            let errorsArray = Object.entries(response.errors);
            for (let i = 0; i < errorsArray.length; i++) {
              this.apiService.showAlert('', errorsArray[i][1][0], 'Ok', () => { });
            }
          }
        } else {
          this.apiService.showAlert('', response.msg, 'Ok', () => {
            this.navCtrl.navigateRoot(['/login']);
          });
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

  openImage() {
    this.apiService.openCamera('PHOTOLIBRARY', (imageData: any) => {
      if (imageData != 'Error') {
        this.userImage = imageData;
      }
    })
  }
}
