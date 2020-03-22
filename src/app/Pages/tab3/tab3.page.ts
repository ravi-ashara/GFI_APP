import { Component } from '@angular/core';
import { ApiCallService } from '../../Services/api-call/api-call.service';
import * as moment from 'moment';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  totalDays: any = [];
  currentDate: any = '';
  constructor(public apicall: ApiCallService) { }
  
  ionViewWillEnter() {
    this.totalDays = this.enumerateDaysBetweenDates(moment().startOf('week'), moment().endOf('week'));
    this.currentDate = moment().format('DD-MMM');
  }

  enumerateDaysBetweenDates(startDate: any, endDate: any) {
    let date = []
    while (moment(startDate) <= moment(endDate)) {
      date.push(startDate);
      startDate = moment(startDate).add(1, 'days');
    }
    return date;
  }

  segmentChanged(val: any) {
    console.log(val.detail.value);
  }
}
