import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import { Router } from '@angular/router';
import { FirebaseDBService } from '../../Services/firebase/firebase-db.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {
  getuserData: any;
  input: any = "";
  constructor(public apicall: ApiCallService,
    public router: Router,
    public firebase: FirebaseDBService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.getuserData = this.router.getCurrentNavigation().extras.state.itemData;
      console.log(this.getuserData);
    }
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
  }

  conversation = [
    {
      text: "Oh yes, this is gooood stuff",
      sender: false,
      image: "assets/images/sg2.jpg",
      type: 'outgoing',
    },
    {
      text: "Hello",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'incoming',
    },
    {
      text: "And it is free ?",
      sender: false, image: "assets/images/sg2.jpg",
      type: 'outgoing',
    },
    {
      text: "Yes, totally free",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'incoming',
    },
    {
      text: "Wow, that's so cool",
      sender: false, image: "assets/images/sg2.jpg",
      type: 'incoming',
    },

    {
      text: "Hats off to the developers",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'outgoing',
    },
    {
      text: "Oh yes, this is gooood stuff",
      sender: false,
      image: "assets/images/sg2.jpg",
      type: 'outgoing'
    },
    {
      text: "Check out their other designs ",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'incoming'
    }, {
      text: "Wow, that's so cool",
      sender: false, image: "assets/images/sg2.jpg",
      type: 'incoming',
    },

    {
      text: "Hats off to the developers",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'outgoing',
    },
    {
      text: "Oh yes, this is gooood stuff",
      sender: false,
      image: "assets/images/sg2.jpg",
      type: 'outgoing'
    },
    {
      text: "Check out their other designs ",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'incoming'
    }, {
      text: "Wow, that's so cool",
      sender: false,
      image: "assets/images/sg2.jpg",
      type: 'incoming',
    },

    {
      text: "Hats off to the developers",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'outgoing',
    },
    {
      text: "Oh yes, this is gooood stuff",
      sender: false,
      image: "assets/images/sg2.jpg",
      type: 'outgoing'
    },
    {
      text: "Check out their other designs ",
      sender: true,
      image: "assets/images/sg1.jpg",
      type: 'incoming'
    }
  ];


  send() {
    if (this.input != "") {
      let data = {
        senderID: 'user_' + localStorage.userId,
        receiverID: 'user_' + this.getuserData.userId,
        messageText: this.input,
        sendDate: Date(),
        receiverImage: this.getuserData.img
      };
      this.firebase.sendMessage(data.senderID, this.firebase.setOneToOneChat(data.senderID, data.receiverID), data).then((response: any) => { });
      this.input = "";
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
    }
  }

  scrollToBottom() {
    let content = document.getElementById("chat-container");
    let parent = document.getElementById("chat-parent");
    let scrollOptions = {
      left: 0,
      top: content.offsetHeight
    };

    parent.scrollTo(scrollOptions);
  }

  getClasses(messageType: any) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  doRefresh(val: any) {
    setTimeout(() => {
      val.target.complete();
    }, 2000);
  }
}
