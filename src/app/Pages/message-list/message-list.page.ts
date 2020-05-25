import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { Router, NavigationExtras } from '@angular/router';
import { NetworkService, ConnectionStatus } from '../../Services/network/network.service';
import { FirebaseDBService } from '../../Services/firebase/firebase-db.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage {
  messageList: any = [];
  constructor(
    public commonService: ApiCallService,
    public router: Router,
    private networkService: NetworkService,
    public firebase: FirebaseDBService) { }

  ionViewWillEnter() {
    this.getChatsList();
  }

  getChatsList() {
    let userID = 'user_' + localStorage.userId;
    this.firebase.receivedUserList(userID).subscribe((response: any) => {
      this.messageList = response.payload.doc;
      console.log(this.messageList)
    });
  }

  gotoChatList(img: any, userName: any, userId: any) {
    if (this.networkService.getCurrentNetworkStatus() === ConnectionStatus.Online) {
      const navigationExtras: NavigationExtras = {
        state: {
          itemData: {
            img: img,
            userName: userName,
            userId: userId ? userId : '1'
          },
        }
      };
      this.router.navigate(['chat'], navigationExtras);
    }
    else {
      this.commonService.showToastWithDuration('You are Offline', 'top', 3000);
    }
  }

  doRefresh(val: any) {
    this.getChatsList();
    setTimeout(() => {
      val.target.complete();
    }, 1000);
  }
}