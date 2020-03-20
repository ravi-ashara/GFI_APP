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
  constructor(private modalCtrl: ModalController, public apicall: ApiCallService, public navCtrl: NavController, public router: Router) { }

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

  deleteMeetingFunc() {
    this.apicall.deleteMeeting('', (callBack: any) => {
      console.log(callBack);
    })
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
