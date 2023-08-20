import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';
import { Friend, Post } from 'src/app/pages/models/about';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnChanges{

  @Input() friendData!: Friend;

  public data!: Friend;

  public avatar!: Post;

  isHaveAvatar!: boolean;
  constructor(private navigate:NavigatePageService){}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['friendData'] && changes['friendData'].currentValue) {
      this.friendData = clone(changes?.['friendData'].currentValue);
      this.data = this.friendData;
      const a = this.data.avatars.find(avatarPost => {
        return avatarPost.fileEntities[0].isCurrenAvatar === 0;
      })

      if(a){
        this.avatar = a as Post;
        this.isHaveAvatar = true;
      }else{
        this.isHaveAvatar = false;
      }
    }
  }

  viewFriend(id:String){
    this.navigate.navigateToPage('/profile',id);
  }
}
