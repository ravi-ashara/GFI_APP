import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage {

  constructor(public apicall: ApiCallService) {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  presentPopover() {
    this.apicall.showPopover().then((val: any) => {
      console.log(val);
    });
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
  input = "";

  send() {
    if (this.input != "") {
      this.conversation.push({
        text: this.input,
        sender: true,
        image: "assets/images/sg1.jpg",
        type: 'outgoing',
      });
      this.input = "";
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  scrollToBottom() {
    console.log('sd');
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
}
