import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { NavController, ModalController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { CreateMeetingPage } from '../create-meeting/create-meeting.page';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';

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
    public router: Router,
    private networkService: NetworkService) { }

  ionViewWillEnter() {
    this.getattendeesList();
    if (localStorage.registerPushNotification != 'true') {
      this.commonService.addDeviceToken();
    }
  }

  getattendeesList() {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      try {
        const passData = {
          user_id: localStorage.userId
        }
        this.commonService.showLoader();
        this.commonService.hitAPICall('post', 'user/attendees-list', passData).subscribe((response: any) => {
          this.commonService.hideLoader();
          if (response.status == "error") {
            this.commonService.showAlert('Error', response.message, 'Ok', () => { });
            localStorage.isLogin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('loginUserData');
            localStorage.removeItem('userId');
            this.navCtrl.navigateRoot(['/login']);
          } else {
            this.attendeesList = response.data ? response.data : [];
          }
        }, error => {
          localStorage.isLogin = false;
          localStorage.removeItem('token');
          localStorage.removeItem('loginUserData');
          localStorage.removeItem('userId');
          this.navCtrl.navigateRoot(['/login']);
          this.commonService.serverSideError();
        });
      } catch (error) {
        this.commonService.serverSideError();
      }
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  searchCompany() {
    this.showSearch = !this.showSearch;
  }

  navigationTab(val: string) {
    this.navCtrl.navigateForward([val]);
  }

  createnewList(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      this.modalCtrl.create({
        component: CreateMeetingPage,
        componentProps: {
          value: val
        }
      }).then((modal: any) => {
        modal.present();
      });
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  gotoChatList(val: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
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
    } else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/profile_photo_icon.png";
  }

  doRefresh(val: any) {
    this.getattendeesList();
    setTimeout(() => {
      val.target.complete();
    },2000);
  }
}
