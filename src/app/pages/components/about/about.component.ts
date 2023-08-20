import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Album, AlbumResponse, Friend, Post } from '../../models/about';
import { User } from '../../models/home-response';

export interface BoxCardInfo {
  type?: string;
  title?: string;
  data?: any[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public albums!: AlbumResponse[];
  public friends!: Friend[];
  public favouriteBooks!: BoxCardInfo;
  public favouriteSports!: BoxCardInfo;

  public user!: User;
  public postAvatar: Post[] = [];
  public postBanner: Post[] = [];

  public activeId: string = 'one';
  constructor(
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMyAbout();
  }

  showContent(id: string) {
    this.activeId = id;
  }

  loadMyAbout(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['data'] == null) {
        const userId = localStorage.getItem('id')!;
        this.profileService.getMyAbout(userId).subscribe({
          next: (res) => {
            if (res.data) {
              this.albums = res.data.myAlbum;
              this.friends = res.data.myFriends;
              this.user = res.data.myProfile;
              this.postAvatar = res.data.myProfile.avatars;
              this.postBanner = res.data.myProfile.banners;
            }
          },
        });
      } else {
        const userId = params['data'] as string;
        this.profileService.getMyAbout(userId).subscribe({
          next: (res) => {
            if (res.data) {
              this.albums = res.data.myAlbum;
              this.friends = res.data.myFriends;
              this.user = res.data.myProfile;
              this.postAvatar = res.data.myProfile.avatars;
              this.postBanner = res.data.myProfile.banners;
            }
          },
        });
      }
    });
  }
}
