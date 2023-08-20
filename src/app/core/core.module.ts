import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WebsocketService } from './service/socket/websocket.service';
import { MessageService } from './service/message/message.service';
import { NavigatePageService } from './service/navigate-page/navigate-page.service';
import { CookieService } from 'ngx-cookie-service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WebsocketService,
    MessageService,
    NavigatePageService,
    CookieService
  ]
})
export class CoreModule { }
