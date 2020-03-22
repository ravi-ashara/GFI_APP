import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController, ModalController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { CreateMeetingPage } from '../create-meeting/create-meeting.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  showSearch: boolean = false;
  userData: any = {};
  constructor(private modalCtrl: ModalController, public commonService: ApiCallService, public navCtrl: NavController, public router: Router) { }

  ionViewWillEnter() {
    this.userData = this.commonService.getUserLoginData();
  }

  searchCompany() {
    this.showSearch = !this.showSearch;
  }

  navigationTab(val: string) {
    this.navCtrl.navigateForward([val]);
  }

  gotoChatList() {
    const navigationExtras: NavigationExtras = {
      state: {
        itemData: {
          img: '../../../assets/images/sg1.jpg',
          userName: 'Jeff',
          userId: '1'
        },
      }
    };
    this.router.navigate(['chat'], navigationExtras);
  }

  createMeeting() {
    this.modalCtrl.create({
      component: CreateMeetingPage
    }).then((modal: any) => {
      modal.present();
    })
  }
}
