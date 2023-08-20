import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';

import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';
import { Post, User } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss'],
})

export class CardInfoComponent implements OnChanges {

  @Input() public userInfo!: User;
  @Input() public avatarPostList!: Post[];
  @Input() public bannerPostList!: Post[];

  public avatarPost!: Post;
  public bannerPost!: Post;

  public userInfoData: User = {
    address: '',
    birthDay: '',
    gender: '',
    lastLoginDate: '',
    linkIg: '',
    mail: '',
    online: false,
    passwords: '',
    phone: '',
    // authorities: [],
    id: '',
    delFlg: 0,
    status: '',
    firstName: '',
    lastName: '',
    description: '',
    city: '',
    linkFacebook: ''
  };

  constructor(
    public navigatePageService: NavigatePageService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo'] && changes['userInfo'].currentValue) {
      this.userInfo = clone(changes?.['userInfo'].currentValue);

      this.userInfoData = this.userInfo;
    }

    if (changes['avatarPostList'] && changes['avatarPostList'].currentValue) {
      this.avatarPostList = clone(changes?.['avatarPostList'].currentValue);
      const avatar = this.avatarPostList.find(avatarPost => {
        return avatarPost.fileEntities[0].isCurrenAvatar === 0;
      })

      this.avatarPost = avatar as Post;
    }

    if (changes['bannerPostList'] && changes['bannerPostList'].currentValue) {
      this.bannerPostList = clone(changes?.['bannerPostList'].currentValue);

      const banner = this.bannerPostList.find(bannerPost => {
        return bannerPost.fileEntities[0].isCurrenBanner === 0;
      })

      this.bannerPost = banner as Post;

    }
  }
}
