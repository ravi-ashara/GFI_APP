import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss'],
})
export class SettingMenuComponent {

  constructor(public popoverController: PopoverController) { }

  closePopover(val: any){
    this.popoverController.dismiss(val);
  }
}
