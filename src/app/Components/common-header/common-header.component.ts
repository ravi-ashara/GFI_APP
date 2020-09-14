import { Component, OnInit, Input } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent {
  @Input() name: string;
  constructor(public navCtrl: NavController) { }

  gotoHome() {
    this.navCtrl.navigateRoot(['home']);
  }

  gotoMore() {
    if (this.name == "About App" || this.name == "Acknowledgement" || this.name == "Term Of Service" || this.name == "Privacy Policy" || this.name == "Event Privacy Policy") {
      this.navCtrl.navigateBack(['/settings']);
      return false;
    }
    this.navCtrl.navigateBack(['/tabs/tab5']);
  }
}
