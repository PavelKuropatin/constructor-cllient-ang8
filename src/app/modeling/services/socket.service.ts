import {Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../../environments/environment';
import CONSTANTS from '../../config/business-constants';
import {CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private readonly topic: string;
  private readonly wsUrl: string;
  private readonly broker: string;
  private client: CompatClient;


  constructor() {
    this.topic = CONSTANTS.SOCKET.TOPIC;
    this.wsUrl = `${environment.socket}/${CONSTANTS.SOCKET.URL}`;
    this.broker = CONSTANTS.SOCKET.BROKER;


  }

  connect(handler: (message: string) => any): void {
    this.client = Stomp.over(new SockJS(this.wsUrl));
    this.client.connect({}, () => {
      this.client.subscribe(this.topic, message => {
        handler(message.body);
      });
    });
  }

  disconnect(): void {
    this.client.disconnect(null);
  }

  send(payload: any): void {
    this.client.send(this.broker, {}, JSON.stringify(payload));
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
