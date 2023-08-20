import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from './core/service/socket/websocket.service';
import { SendDataService } from './core/service/data/send-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  constructor(
    private webSocketService: WebsocketService,
    private dataService: SendDataService,
    private cookieService: CookieService
  ) {

  }
  ngOnInit(): void {
    const mail = this.cookieService.get('email').replace("%40","@");
    console.log("cookie mail "+ mail)
    if(mail){
      this.dataService.setEmail(mail);
    }
    this.dataService.email$.subscribe((email) => {
      if (email) {
        this.webSocketService.connect(email);

      } else {
        const emailLocal = this.cookieService.get('email') as string;
        if (emailLocal) {
          this.webSocketService.connect(emailLocal);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    this.webSocketService.disconnect();
  }
}
