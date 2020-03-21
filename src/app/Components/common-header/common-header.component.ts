import { Component, OnInit, Input } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {
  @Input() name: string;
  userData: any = {};
  constructor(public commonService: ApiCallService, public navCtrl: NavController) { }
  ngOnInit() {
    this.userData = this.commonService.getUserLoginData();
  }
  presentPopover() {
    this.commonService.showPopover().then((val: any) => {
      console.log(val);
    });
  }

  gotoHome() {
    this.navCtrl.navigateRoot(['home']);
  }

  gotoMore() {
    this.navCtrl.navigateBack(['/tabs/tab5']);
  }
}
