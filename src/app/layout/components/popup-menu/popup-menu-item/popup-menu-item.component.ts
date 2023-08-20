import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clone } from 'lodash';
import { Utils } from 'src/app/common/utils/utils';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { Message, Notification, Relationship, User } from 'src/app/pages/models/home-response';
import { MessageService } from 'src/app/pages/services/message.service';

@Component({
  selector: 'app-popup-menu-item',
  templateUrl: './popup-menu-item.component.html',
  styleUrls: ['./popup-menu-item.component.scss']
})
export class PopupMenuItemComponent implements OnChanges, OnInit {
  @Input() public data: unknown;
  @Input() public type: string | undefined;

  public friend!: User;

  public utils = Utils;
  public friendId: string = '';
  public notificationData!: Notification;
  public relationShipData!: Relationship;
  public userId!: string;
  public messageDisplay: Message | undefined;

  public constructor(private route: ActivatedRoute, private dataService: SendDataService, private messageService: MessageService) {
    this.userId = localStorage.getItem('id')!;
  }


  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = clone(changes?.['data'].currentValue);
      this.type = clone(changes?.['type'].currentValue);

      if (this.type === 'notification') {
        this.notificationData = this.data as Notification;
      } else {
        this.relationShipData = this.data as Relationship;


        if (this.relationShipData.idUserOne.id === this.userId) {
          this.friend = this.relationShipData.idUserTow;
        } else if (this.relationShipData.idUserTow.id === this.userId) {
          this.friend = this.relationShipData.idUserOne;
        }

      }

    }

  }

  public ngOnInit(): void {
    if (this.relationShipData) {
      this.messageDisplay = this.relationShipData.messages?.slice(this.relationShipData.messages.length - 1, this.relationShipData.messages.length)[0];
    }

    this.dataService.message$.subscribe(message => {
      if (message) {
        this.messageDisplay = message;
      }
    });
  }

  public showMessage(friend: User) {
    this.dataService.setUser(friend);
  }


}
