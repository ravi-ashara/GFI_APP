import { Component } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss'],
})
export class SettingMenuComponent {

  constructor(public popoverController: PopoverController,
    public navCtrl: NavController) { }

  closePopover(val: any) {
    this.popoverController.dismiss(val);
    switch (val) {
      case 'Setting':
        this.navCtrl.navigateForward(['/settings']);
        break;
      case 'Logout':
        this.navCtrl.navigateRoot(['/login']);
        localStorage.isLogin = false;
        break;
      case 'Notification':
        this.navCtrl.navigateForward(['/notification']);
        break;
      default:
        break;
    }
  }
}
