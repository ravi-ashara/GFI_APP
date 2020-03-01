import { Component } from '@angular/core';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage {
  createMeeting: boolean = false;
  constructor() { }

  setMeetingData(){
    this.createMeeting = !this.createMeeting;
  }
}
