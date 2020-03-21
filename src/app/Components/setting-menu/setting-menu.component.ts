import { Component } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss'],
})
export class SettingMenuComponent {

  constructor(public popoverController: PopoverController,
    public navCtrl: NavController,
    public commonService: ApiCallService) { }

  closePopover(val: any) {
    this.popoverController.dismiss(val);
    switch (val) {
      case 'Setting':
        this.navCtrl.navigateForward(['/settings']);
        break;
      case 'Logout':
        this.commonService.afterLogout();
        break;  
      case 'Notification':
        this.navCtrl.navigateForward(['/notification']);
        break;
      case 'Messages':
        this.navCtrl.navigateForward(['/message-list']);
        break;
      case 'My Profile':
        this.navCtrl.navigateForward(['/my-profile']);
        break;
      default:
        break;
    }
  }
}
