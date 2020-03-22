import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage {
  userData: any = {};
  constructor(public commonService: ApiCallService) { }

  ionViewWillEnter() {
    this.userData = this.commonService.getUserLoginData();
  }
}
