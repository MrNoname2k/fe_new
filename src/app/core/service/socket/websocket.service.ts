import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { MessageService } from '../message/message.service';
import { Message } from '../../models/message';
import { CookieService } from 'ngx-cookie-service';
import { SendDataService } from '../data/send-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrComponent } from 'src/app/common/components/toastr/toastr.component';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public stompClient!: CompatClient;
  public messages: any = [];
  public _isMount = true;
  public connected = false;
  public message: any;

  constructor(
    private messageService: MessageService,
    private cookieService: CookieService,
    private dataService: SendDataService,
    private _snackbar: MatSnackBar
  ) { }

  public getAllSendMessages(id: string) {
    return this.messageService.getAllMessages(id);
  }


  public connect(email: string) {
    if (this.connected) {
      return;
    }
    const ws = new SockJS(`${API_URL}/socket`);
    this.stompClient = Stomp.over(ws);
    const headers = this.getAuthHeader();
    if (this._isMount) {
      this.stompClient.connect(headers, (frame: any) => {

        this.connected = true;
        this.onConnect(email);
      }, (error: any) => {
        setTimeout(() => this.connect(email), 1000);
      }
      );
    }
  }

  public onConnect(email: string) {
    this.stompClient.subscribe(`/user/${email}/notifications`, (message: any) => {
      if (message.body) {
        const messageBody: Notification = JSON.parse(message.body);

        if (messageBody) {

          this._snackbar.openFromComponent(ToastrComponent,
            {
              duration: 3000,
              data: messageBody,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: 'snackbar-container'
            });
        }
      }
    });

    this.stompClient.subscribe(`/user/${email}/messages`, (message: any) => {
      const messageBody: Message = JSON.parse(message.body);
      this.dataService.setMessage(messageBody);
    });
  }

  public disconnect() {
    this.stompClient.disconnect();
    this.connected = false;
  }

  public sendNewMessageUsingWebSocket(msg: Message, id: string) {
    this.stompClient.send('/app/message', {}, JSON.stringify(msg));
  }

  public getFriendMessages() {
    return this.messageService.getAllFriendMessages();
  }

  // Get Token on localStorage and return a header
  public getAuthHeader() {
    const token = this.cookieService.get('access_token');
    return token && token.length ? { Authorization: `Bearer ${token}` } : {};
  }
}
