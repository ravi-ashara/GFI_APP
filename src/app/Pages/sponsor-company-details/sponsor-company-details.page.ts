import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-sponsor-company-details',
  templateUrl: './sponsor-company-details.page.html',
  styleUrls: ['./sponsor-company-details.page.scss'],
})
export class SponsorCompanyDetailsPage {
  public modalData: any;
  public pageName: any;
  constructor(private modalCtrl: ModalController,
    private navParam: NavParams) {
    this.pageName = this.navParam.get('pageName');
    this.modalData = this.navParam.get('value');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/company-placeholder.jpg";
  }
}
