import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage {

  constructor(public apicall: ApiCallService, public router: Router) { }

  gotoChatList(img: any, userName: any, userId: any) {
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
}
