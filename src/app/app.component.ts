import { ApiCallService } from './Services/api-call/api-call.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertModule: ApiCallService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handleHardwareBackButton();
    });
  }

  handleHardwareBackButton() {
    this.platform.backButton.subscribe((event: any) => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/login') {
        navigator['app'].exitApp();
      } else {
        if (this.router.url.includes('/tabs')) {
          this.alertModule.showConfirm('Goisrael App ','Are you sure you want to exit ?', ['Cancel', 'Exit'], (res: any) => {
            if (res === "Yes") {
              navigator['app'].exitApp();
            }
          });
        }
      }
    });
  }
}
