import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  showSearch: boolean = false;
  constructor(public apicall: ApiCallService, public navCtrl: NavController) { }

  searchCompany() {
    this.showSearch = !this.showSearch;
  }
  presentPopover() {
    this.apicall.showPopover().then((val: any) => {
      console.log(val);
    });
  }

  navigationTab(val: string) {
    this.navCtrl.navigateForward([val]);
  }
}
