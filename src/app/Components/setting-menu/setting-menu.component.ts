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
    if (val === 'Setting') {
      this.navCtrl.navigateForward(['/settings']);
    }
  }
}
