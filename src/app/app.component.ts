import { ApiCallService } from './Services/api-call/api-call.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet, NavController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages: any = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/my-profile',
      icon: 'person'
    },
    {
      title: 'Setting',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Messages',
      url: '/message-list',
      icon: 'chatbubbles'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'power'
    }
  ];
  public userData: any = [];
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public commonService: ApiCallService,
    public navCtrl: NavController,
    public event: Events
  ) {
    this.initializeApp();
    this.event.unsubscribe('UpdateUserData');
    this.event.subscribe('UpdateUserData', () => {
      this.getDetails();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.handleHardwareBackButton();
      this.commonService.pushNotifications();
    });
    if (localStorage.token) {
      this.getDetails();
    }
  }

  getDetails() {
    this.userData = this.commonService.getUserLoginData();
  }

  errorImage(val: any) {
    return val.target.src = "assets/images/profile_photo_icon.png";
  }
  
  handleHardwareBackButton() {
    this.platform.backButton.subscribe((event: any) => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/login') {
        navigator['app'].exitApp();
      } else {
        if (this.router.url === '/home') {
          this.commonService.showConfirm('Goisrael App ', 'Are you sure you want to exit ?', ['Cancel', 'Exit'], (res: any) => {
            if (res === "Yes") {
              navigator['app'].exitApp();
            }
          });
        }
      }
    });
  }

  navigatePage(val: any) {
    if (val.title == "Logout") {
      this.commonService.afterLogout();
    } else {
      this.navCtrl.navigateForward([val.url]);
    }
  }
}
