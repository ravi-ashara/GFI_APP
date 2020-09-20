import { Component, Input } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent {
  @Input() name: string;
  constructor(public commonService: ApiCallService) { }

  gotoHome() {
    this.commonService.navigate_Root('home');
  }

  gotoMore() {
    if (this.name == "About App" || this.name == "Acknowledgement" || this.name == "Term Of Service" || this.name == "Privacy Policy" || this.name == "Event Privacy Policy") {
      this.commonService.navigate_Back('settings');
      return false;
    }
    this.commonService.navigate_Back('/tabs/tab5');
  }
}
