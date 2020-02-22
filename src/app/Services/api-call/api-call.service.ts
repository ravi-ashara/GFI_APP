import { SettingMenuComponent } from './../../Components/setting-menu/setting-menu.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, AlertController, ToastController, LoadingController, PopoverController, NavController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  public loading: any;
  constructor(
    public http: HttpClient,
    public platform: Platform,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public popoverController: PopoverController,
    public navCtrl: NavController) { }

  showLoader() {
    this.loading = this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios',
    }).then((loader: any) => {
      loader.present();
    })
  }

  hideLoader() {
    this.loading.dismiss();
  }

  /**
   * 
   * @param val_method // get/post/delete
   * @param val_url // Endpoint URL
   * @param val_data // PayLoad Data Post Method
   */
  hitAPICall(val_method: string, val_url: any, val_data: any) {
    if (val_method === 'get') {
      return this.http.get(environment.baseURL + val_url);
    } else if (val_method === 'post') {
      return this.http.post(val_url, val_data, {
        headers: { 'Access-Control-Allow-Origin': '*', }
      });
    } else if (val_method === 'delete') {
      return this.http.delete(val_url);
    }
  }

  /**
   * 
   * @param val_header //Show header
   * @param val_message // Show Message
   * @param val_button // Button Name
   * @param callBack_func // Return value Yes
   */
  showAlert(val_header: string, val_message: string, val_button: any, callBack_func: any) {
    this.alertController.create({
      header: val_header,
      message: val_message,
      mode: 'ios',
      buttons: [
        {
          text: val_button,
          handler: () => {
            callBack_func('Yes');
          }
        }
      ]
    }).then((alert: any) => {
      alert.present();
    });
  }

  /**
   * 
   * @param val_header //Show header
   * @param val_message // Show Message
   * @param val_button // button name ['No','Yes']
   * @param callBack_func // Return value No/Yes
   */
  showConfirm(val_header: string, val_message: string, val_button: any, callBack_func: any) {
    this.alertController.create({
      header: val_header,
      message: val_message,
      mode: 'ios',
      buttons: [
        {
          text: val_button[0],
          role: 'cancel',
          handler: (blah) => {
            callBack_func('No');
          }
        },
        {
          text: val_button[1],
          handler: () => {
            callBack_func('Yes');
          }
        }
      ]
    }).then((confirm: any) => {
      confirm.present();
    });
  }

  /**
   * 
   * @param val_message //Show Message
   * @param val_position // set position top/bottom
   * @param val_duration // val_duration set duration Number
   */
  showToastWithDuration(val_message: string, val_position: any, val_duration: number) {
    this.toastController.create({
      message: val_message,
      position: val_position,
      duration: val_duration
    }).then((toast: any) => {
      toast.present();
    });
  }

  /**
   * Automatically hide after 7 second.
   * @param val_message  //Show Message
   * @param val_position // set position top/bottom
   * @param callback_func Callback function return Yes
   */
  showToastWithButton(val_message: string, val_position: any, callback_func: any) {
    this.toastController.create({
      message: val_message,
      position: val_position,
      duration: 7000,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            callback_func('Yes');
          }
        }
      ]
    }).then((toast: any) => {
      toast.present();
    });
  }

  showPopover() {
    return new Promise((resolve, reject) => {
      this.popoverController.create({
        component: SettingMenuComponent,
        translucent: true,
        cssClass: 'customPopover',
        mode: 'md'
      }).then((popover: any) => {
        popover.present();
        popover.onDidDismiss().then((val: any) => {
          resolve(val);
        })
      });
    })
  }

  callLogout(){
    localStorage.isLogin = false;
    this.navCtrl.navigateRoot(['/login'])
  }
}
