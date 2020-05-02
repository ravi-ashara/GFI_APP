import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, AlertController, ToastController, LoadingController, NavController, Events } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Push, PushOptions, PushObject } from '@ionic-native/push/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  public isconfirmBox: boolean = false;
  constructor(
    public http: HttpClient,
    public platform: Platform,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    private push: Push,
    public camera: Camera,
    public event: Events,
    private base64: Base64,
    private crop: Crop) { }

  commonUpdateUserDataEve() {
    this.event.publish('UpdateUserData');
  }
  showLoader() {
    this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios',
    }).then((loader: any) => {
      loader.present();
    })
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }

  /**
   * 
   * @param val_method // get/post/delete
   * @param val_url // Endpoint Name
   * @param val_data // PayLoad Data Post Method
   */
  hitAPICall(val_method: string, val_url: any, val_data: any) {
    if (val_method === 'get ') {
      return this.http.get(environment.baseURL + val_url);
    } else if (val_method === 'post') {
      return this.http.post(environment.baseURL + val_url, val_data, {
        headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + localStorage.token }
      });
    } else if (val_method === 'delete') {
      return this.http.delete(environment.baseURL + val_url);
    }
  }

  /**
   * 
   * @param val_header //Show header //Show header pass '' to show custom header
   * @param val_message // Show Message
   * @param val_button // Button Name
   * @param callBack_func // Return value Yes
   */
  showAlert(val_header: string, val_message: string, val_button: any, callBack_func: any) {
    this.alertController.create({
      header: val_header ? val_header : 'Goisrael App',
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
   * @param val_header //Show header pass '' to show custom header
   * @param val_message // Show Message
   * @param val_button // button name ['No','Yes']
   * @param callBack_func // Return value No/Yes
   */
  showConfirm(val_header: string, val_message: string, val_button: any, callBack_func: any) {
    this.isconfirmBox = true;
    this.alertController.create({
      header: val_header ? val_header : 'Goisrael App',
      message: val_message,
      mode: 'ios',
      buttons: [
        {
          text: val_button[0],
          role: 'cancel',
          handler: (blah) => {
            this.isconfirmBox = false;
            callBack_func('No');
          }
        },
        {
          text: val_button[1],
          handler: () => {
            this.isconfirmBox = false;
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

  /**
   * 
   * @param val_header //Show header pass '' to show custom header
   * @param message // Show Message
   * @param callBack // CallBack (Delete/Cancel)
   */
  deleteMeetingConfirmBox(val_header: string, message: string, callBack: any) {
    this.alertController.create({
      header: val_header ? val_header : 'Delete Data',
      message: message ? message : '',
      mode: 'ios',
      cssClass: 'deleteMeetingConfirm',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            callBack('Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            callBack('Delete');
          }
        }
      ]
    }).then((alert: any) => {
      alert.present();
    });
  }

  /**
   * Register push notification and show notification on received.
   */
  pushNotifications() {
    const options: PushOptions = {
      android: {
        senderID: '703559770185'
      },
      ios: {
        sound: true,
        badge: true
      }
    };

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((data: any) => {
      localStorage.registrationPushToken = data.registrationId;
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('Received a notification ', data);
      if (data.additionalData.foreground) { // if application open
        if (this.isconfirmBox === true) {
          this.alertController.dismiss();
        }
        this.showConfirm(data.title, data.message, ['Cancel', 'See'], (res: any) => {
          if (res == 'Yes') {
            if (localStorage.token != undefined) {
              this.navCtrl.navigateRoot(['/notification']);
            } else {
              this.navCtrl.navigateRoot(['/login']);
            }
          }
        });
      } else {
        if (localStorage.token != undefined) {
          this.navCtrl.navigateRoot(['/notification']);
        } else {
          this.navCtrl.navigateRoot(['/login']);
        }
      }
    });

    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin' + JSON.stringify(error));
    });
  }

  /**
   * get user login data
   */
  getUserLoginData() {
    return JSON.parse(localStorage.loginUserData);
  }

  /**
   * Clear localStorage click on logout.
   */
  afterLogout() {
    try {
      this.showLoader();
      let passData = {
        type: this.platform.is('android') == true ? 'android' : this.platform.is('ios') == true ? 'ios' : 'web'
      }
      this.hitAPICall('post', 'user/logout', passData).subscribe((response: any) => {
        this.hideLoader();
        if (response.status == "error") {
          this.showAlert('Error', response.message, 'Ok', () => { });
        } else {
          localStorage.isLogin = false;
          localStorage.removeItem('token');
          localStorage.removeItem('loginUserData');
          localStorage.removeItem('userId');
          this.navCtrl.navigateRoot(['/login']);
        }
      }, error => {
        this.hideLoader();
        this.showAlert('Error', 'Error form server side', 'Ok', () => { });
      });
    } catch (error) {
      this.hideLoader();
      this.showAlert('Error', 'Error form server side', 'Ok', () => { });
    }
  }

  /**
   * 
   * @param val // 'CAMERA/PHOTOLIBRARY'
   * @param callBack callback function
   */
  openCamera(val: any, callBack: any) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: val == "CAMERA" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData: any) => {
      this.cropImage(imageData, (returnVal: any) => {
        callBack(returnVal);
      });
    }, (err) => {
      callBack('Error');
    });
  }

  /**
   * 
   * @param fileURI //File URL
   * @param callBack //Return base64 string
   */
  cropImage(fileURI: any, callBack: any) {
    this.crop.crop(fileURI, { quality: 100 }).then((newImage: any) => {
      this.base64.encodeFile(newImage).then((base64File: string) => {
        callBack(this.replaceBase64String(base64File));
      }, (err) => {
        callBack('Error');
      });
    }, error => {
      callBack('Error');
    });
  }

  /**
   * 
   * @param val_Base64 remove 'data:image/*;charset=utf-8;base64'
   */
  replaceBase64String(val_Base64: any) {
    return val_Base64.replace('data:image/*;charset=utf-8;base64,', '');
  }

  /**
   * Register device token
   */
  addDeviceToken() {
    try {
      let passData: any = {
        user_id: localStorage.userId,
        type: this.platform.is('android') ? 'android' : 'ios',
        token: localStorage.registrationPushToken
      }
      this.hitAPICall('post', 'user/add-device-token', passData).subscribe((response: any) => {
        if (response.status == "success") {
          localStorage.registerPushNotification = true;
        }
      }, error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Hide loader with Show server side error message
   */
  serverSideError() {
    this.hideLoader();
    this.showAlert('', 'Error form server side', 'Ok', () => { });
  }
}
