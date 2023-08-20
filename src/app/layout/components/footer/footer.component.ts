import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  DoCheck,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clone, isEqual, map } from 'lodash';
import { Utils } from 'src/app/common/utils/utils';
import {
  Message,
  MessageAllView,
  MessageResponse,
} from 'src/app/core/models/message';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';
import { WebsocketService } from 'src/app/core/service/socket/websocket.service';
import {
  HomePageResponse,
  Post,
  Relationship,
  User,
} from 'src/app/pages/models/home-response';
import { MessageService } from 'src/app/pages/services/message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() homeDataResponse!: HomePageResponse;

  @ViewChild('appScrollBottom') public scrollBottom!: ElementRef;

  public isShowChat = false;
  public isShowSearchFriend = false;
  public listRelationships: Relationship[] = [];
  public friends: User[] = [];
  public avatars!: Post[];
  public banners!: Post[];
  public messagesViewAll!: MessageAllView;
  public loggedInUserId: string = '';
  public newMessage!: MessageResponse;
  public utils = Utils;
  public chatUserId: string = '';
  public messageContent!: string | null;
  public friendsSearch: User[] = [];

  public constructor(
    private socketService: WebsocketService,
    private route: ActivatedRoute,
    private dataService: SendDataService,
    private messageService: MessageService,
    public navigateService: NavigatePageService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['homeDataResponse'] &&
      changes['homeDataResponse'].currentValue
    ) {
      this.homeDataResponse = clone(changes?.['homeDataResponse'].currentValue);

      if (this.homeDataResponse.relationshipEntities) {
        this.listRelationships = this.homeDataResponse.relationshipEntities;
        const listFriend = this.listRelationships.map((relationship) => {
          if (
            this.checkRelationship(
              relationship.idUserOne,
              this.homeDataResponse.userEntity
            )
          ) {
            return relationship.idUserTow;
          } else if (
            this.checkRelationship(
              relationship.idUserTow,
              this.homeDataResponse.userEntity
            )
          ) {
            return relationship.idUserOne;
          }
          return null;
        });

        this.friends = listFriend as User[];
        this.friendsSearch = listFriend as User[];
      }
    }
  }

  public ngOnInit(): void {
    this.loggedInUserId = localStorage.getItem('id')!;

    this.dataService.message$.subscribe((data) => {
      if (data && data !== 'checked') {
        const time = new Date();
        const dateString = time.toISOString();
        this.newMessage = {
          content: data.content,
          createDate: dateString,
          delFlg: data.delFlg,
          id: data.id,
          fromUserId: data.userFrom.id,
          status: data.status,
          updateDate: data.updateDate,
        };

        this.messagesViewAll?.messages.push(this.newMessage);
      }
    });

    this.dataService.user$.subscribe((user) => {
      if (user) {
        this.showChart(user.id);
      }
    });
  }

  public ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public checkRelationship(user1?: User, user2?: User): boolean {
    if (user1?.id === user2?.id) {
      return true;
    }
    return false;
  }

  public slideConfig = {
    slidesToShow: 10,
    slidesToScroll: 1,
    dots: false,
  };

  public send() {
    if (this.messageContent) {
      let message: Message = {
        fromUserId: this.loggedInUserId,
        toUserId: this.chatUserId,
        content: this.messageContent,
      };

      this.socketService.sendNewMessageUsingWebSocket(message, this.chatUserId);

      this.messageContent = null;
    }
  }

  public showChart(userId: string) {
    this.isShowChat = true;
    this.chatUserId = userId;
    if (userId) {
      this.socketService.getAllSendMessages(userId).subscribe((res) => {
        if (res.meta.code === '200') {
          if (res.data) {
            this.messagesViewAll = res.data;
            console.log("🚀 ~ file: footer.component.ts:166 ~ FooterComponent ~ this.socketService.getAllSendMessages ~ this.messagesViewAll:", this.messagesViewAll)
          }
        }
      });

      this.messageService
        .updateStatus({ fromUserId: this.loggedInUserId, toUserId: userId })
        .subscribe({
          next: (res) => {
            if (res.meta.code === '200') {
              this.dataService.setMessage('checked');
            }
          },
        });
    }
  }

  public scrollToBottom() {
    const scrollHeight: number = this.scrollBottom.nativeElement.scrollHeight;
    const element = this.scrollBottom.nativeElement as HTMLElement;

    element.scrollTop = scrollHeight;
  }

  searchFriend(key: string) {
    if (key == null) {
      this.friends = this.friendsSearch;
    } else {
      const find: User[] = [];
      this.friendsSearch.forEach((e) => {
        if (e.firstName.includes(key) || e.lastName.includes(key)) {
          find.push(e);
        }
      })
      this.friends = find;
    }
  }
}
