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
  attendeesList: any = [];
  searchVal: any = "";
  constructor(
    private modalCtrl: ModalController,
    public commonService: ApiCallService,
    public navCtrl: NavController,
    public router: Router) { }

  ionViewWillEnter() {
    this.getattendeesList();
    if (localStorage.registerPushNotification != 'true') {
      this.commonService.addDeviceToken();
    }
  }

  getattendeesList() {
    try {
      this.commonService.showLoader();
      this.commonService.hitAPICall('post', 'user/attendees-list', '').subscribe((response: any) => {
        this.commonService.hideLoader();
        if (response.status == "error") {
          this.commonService.showAlert('Error', response.message, 'Ok', () => { });
        } else {
          this.attendeesList = response.data ? response.data : [];
        }
      }, error => {
        this.commonService.hideLoader();
        this.commonService.showAlert('Error', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.commonService.hideLoader();
      this.commonService.showAlert('Error', 'Error form server side', 'Ok', () => { });
    }
  }

  searchCompany() {
    this.showSearch = !this.showSearch;
  }

  navigationTab(val: string) {
    this.navCtrl.navigateForward([val]);
  }

  createnewList(val: any) {
    this.modalCtrl.create({
      component: CreateMeetingPage,
      componentProps: {
        value: val
      }
    }).then((modal: any) => {
      modal.present();
    });
  }

  gotoChatList(val: any) {
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
    });
  }
}
