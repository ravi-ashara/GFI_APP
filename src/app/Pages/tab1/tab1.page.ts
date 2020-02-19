import { ApiCallService } from './../../Services/api-call/api-call.service';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SettingMenuComponent } from './../../Components/setting-menu/setting-menu.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public apicall: ApiCallService) { }

  presentPopover() {
    this.apicall.showPopover().then((val: any) => {
      console.log(val);
    });
  }
}
