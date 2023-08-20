import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PopupConfig } from '../popup-menu/popup-menu.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { WebsocketService } from 'src/app/core/service/socket/websocket.service';
import { HomePageResponse, Notification, Post, Relationship, User } from 'src/app/pages/models/home-response';
import { clone } from 'lodash';
import { NotificationService } from 'src/app/pages/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() userInfo!: User;
  @Input() homeResponse!: HomePageResponse;

  public userId: string = '';
  public avatar!: Post;
  public isMenuOpened: boolean = false;
  public openMenuListNumber = 0;
  public newNotification!: Notification;
  public notifications: Notification[] = [];
  public popupProperties: PopupConfig = {};
  public numberOfNotificationUnchecked: number = 0;
  public numberOfMessageUnchecked: number = 0;
  public relationShipList: Relationship[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private dataService: SendDataService,
    private socketService: WebsocketService,
    private notificationService: NotificationService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo'] && changes['userInfo'].currentValue) {
      this.userInfo = clone(changes?.['userInfo'].currentValue);
      if (this.userInfo.avatars) {
        this.avatar = this.userInfo.avatars[0] as unknown as Post;
      }
    }

    if (changes['homeResponse'] && changes['homeResponse'].currentValue) {
      this.homeResponse = clone(changes?.['homeResponse'].currentValue);

      if (this.homeResponse.notificationEntityPage?.results) {
        this.notifications = this.homeResponse.notificationEntityPage.results;

        this.notifications.forEach(notification => {
          if (notification.status === 'unchecked') {
            this.numberOfNotificationUnchecked++;
          }
        });
      }

      if (this.homeResponse.relationshipEntities) {
        this.relationShipList = this.homeResponse.relationshipEntities;
        this.relationShipList.forEach(relationship => {
          if(relationship.messages?.find(message => message.status === 'unchecked' && message.userFrom.id !== this.userId)) {
            this.numberOfMessageUnchecked++;
          }
        });
      }
    }

    if (changes['homeResponse'] && changes['homeResponse'].currentValue) {
      this.homeResponse = clone(changes?.['homeResponse'].currentValue);

      if (this.homeResponse.notificationEntityPage?.results) {
        this.notifications = this.homeResponse.notificationEntityPage.results;

        this.notifications.forEach(notification => {
          if (notification.status === 'unchecked') {
            this.numberOfNotificationUnchecked++;
          }
        });
      }

      if (this.homeResponse.relationshipEntities) {
        this.relationShipList = this.homeResponse.relationshipEntities;
        this.relationShipList.forEach(relationship => {
          if(relationship.messages?.find(message => message.status === 'unchecked' && message.userFrom.id !== this.userId)) {
            this.numberOfMessageUnchecked++;
          }
        });
      }
    }

    if (changes['homeResponse'] && changes['homeResponse'].currentValue) {
      this.homeResponse = clone(changes?.['homeResponse'].currentValue);

      if (this.homeResponse.notificationEntityPage?.results) {
        this.notifications = this.homeResponse.notificationEntityPage.results;

        this.notifications.forEach(notification => {
          if (notification.status === 'unchecked') {
            this.numberOfNotificationUnchecked++;
          }
        });
      }

      if (this.homeResponse.relationshipEntities) {
        this.relationShipList = this.homeResponse.relationshipEntities;
        this.relationShipList.forEach(relationship => {
          if(relationship.messages?.find(message => message.status === 'unchecked' && message.userFrom.id !== this.userId)) {
            this.numberOfMessageUnchecked++;
          }
        });
      }
    }

    if (changes['homeResponse'] && changes['homeResponse'].currentValue) {
      this.homeResponse = clone(changes?.['homeResponse'].currentValue);

      if (this.homeResponse.notificationEntityPage?.results) {
        this.notifications = this.homeResponse.notificationEntityPage.results;

        this.notifications.forEach(notification => {
          if(notification.status === 'unchecked') {
            this.numberOfNotificationUnchecked++;
          }
        });
      }
    }
  }

  public ngOnInit(): void {
    this.userId = localStorage.getItem('id')!;

    this.dataService.notification$.subscribe((data) => {
      if (data) {
        this.newNotification = data;
        if (this.newNotification) {
          this.newNotification.createDate = new Date().toISOString();
          this.notifications.unshift(this.newNotification);
          this.numberOfNotificationUnchecked++;
        }
      }
    });

    this.dataService.message$.subscribe(message => {
      if(message === 'checked') {
        this.numberOfMessageUnchecked = 0;
      }else if(message && message.userFrom.id !== this.userId){

        this.numberOfMessageUnchecked++;
      }
    });
  }


  public btnAction(message: string): void {
    if (message === 'message') {
      this.popupProperties = {
        title: 'Recent Message',
        apply: 'message',
        data: this.relationShipList
      };
    }

    if (message === 'notification') {
      this.popupProperties = {
        title: 'Recent Notifications',
        apply: 'notification',
        data: this.notifications
      };
      this.notificationService.updateNotificationStatus().subscribe(data => {
        this.notifications = data.data;

        if (this.notifications.every((notification) => notification.status !== 'unchecked')) {
          this.numberOfNotificationUnchecked = 0;
        }

      });
    }
  }

  public doLogout(): void {
    
    this.authService.doLogout();
    this.socketService.disconnect();
  }

  public getHomePage(): void {
    localStorage.removeItem('email');
    this.dataService.setEmail('');
    this.router.navigate(['home'], { queryParams: { userId: this.userId } });
  }
}
