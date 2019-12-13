import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ApiCallService } from '../api-call/api-call.service';
import { BehaviorSubject, Observable } from 'rxjs';
export enum ConnectionStatus {
  Online,
  Offline
}
@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  constructor(
    public network: Network,
    public bs: ApiCallService) {
    this.initializeNetworkEvents();
    const status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
    this.status.next(status);
  }

  public initializeNetworkEvents() {

    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
    const connection = status === ConnectionStatus.Offline ? 'Offline' : 'Online';
    this.bs.showToastWithDuration(`You are now ${connection}`, 'top', 3000);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
