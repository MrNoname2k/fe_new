import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clone } from 'lodash';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';
import { Post, User } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.scss'],
})
export class ProfileBannerComponent implements OnChanges {
  @Input() public userInfo!: User;
  @Input() public avatarPostList!: any[];
  @Input() public bannerPostList!: any[];

  public avatarPost!: Post;
  public bannerPost!: Post;
  public userInfoData!: User;
  public id!: string;
  constructor(
    public navigateCtrl: NavigatePageService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo'] && changes['userInfo'].currentValue) {
      this.userInfo = clone(changes?.['userInfo'].currentValue);

      this.userInfoData = this.userInfo;
    }

    if (changes['avatarPostList'] && changes['avatarPostList'].currentValue) {
      this.avatarPostList = clone(changes?.['avatarPostList'].currentValue);
      const avatar = this.avatarPostList.find((avatarPost) => {
        return avatarPost.fileEntities[0].isCurrenAvatar === 0;
      });

      this.avatarPost = avatar as Post;
      console.log(this.avatarPost);
    }

    if (changes['bannerPostList'] && changes['bannerPostList'].currentValue) {
      this.bannerPostList = clone(changes?.['bannerPostList'].currentValue);

      const banner = this.bannerPostList.find((bannerPost) => {
        return bannerPost.fileEntities[0].isCurrenBanner === 0;
      });

      this.bannerPost = banner as Post;
      console.log(this.bannerPost);
    }
  }
  @HostListener('click')
  timeLine() {
    this.navigateCtrl.navigateToPage('/profile',this.userInfo.id);
  }
  @HostListener('click')
  about() {
        this.navigateCtrl.navigateToPage('/about',this.userInfo.id);
  }

  editProfile(){
    this.navigateCtrl.navigate('/your-account');
  }
}
