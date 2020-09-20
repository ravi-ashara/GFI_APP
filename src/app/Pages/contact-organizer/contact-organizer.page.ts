import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-contact-organizer',
  templateUrl: './contact-organizer.page.html',
  styleUrls: ['./contact-organizer.page.scss'],
})
export class ContactOrganizerPage {
  public userData: any;
  public contactForm: FormGroup;
  constructor(public formBuilder: FormBuilder,
    private commonService: ApiCallService,
    private networkService: NetworkService) {
    this.userData = this.commonService.getUserLoginData();
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.contactForm.get('name').setValue(this.userData.u_first_name + ' ' + this.userData.u_last_name);
    this.contactForm.get('email').setValue(this.userData.u_email);
  }

  submitForm(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        this.commonService.showLoader();
        this.commonService.http.post(environment.baseURL + 'contact-us/save', val.value).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "success") {
            this.commonService.showToastWithDuration(response.msg,'top',3000);
            this.commonService.navigate_Root('home');
          }else{
            this.commonService.showToastWithDuration("Error form server side",'top',3000);
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
