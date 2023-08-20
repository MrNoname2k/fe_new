import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Post, PostPage, User } from '../../models/home-response';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(private profileService: ProfileService, private dataService:SendDataService, private cookie:CookieService,private activeRoute:ActivatedRoute){}
  public myPost!: PostPage;
  myPostResponse: Post[] = [];
  public userInfo!: User;
  public postAvatar: Post[] =[];
  public postBanner: Post[] = [];
  ngOnInit(): void {
      this.loadMyTimeLine();
  }
  loadMyTimeLine(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['data'] == null) {
        const userId = localStorage.getItem('id')!;
        this.profileService.getMyTimeLinePosts(userId).subscribe({
          next:(res)=>{
            if(res.data){
              this.postAvatar = res.data.myProfile.avatars;
              this.postBanner = res.data.myProfile.banners;
              this.myPost = res.data.myPost;
              this.userInfo = res.data.myProfile;
              console.log(res.data.avatars)
            }
          }
        })
      }else{
        console.log('Run View Friend')
        const userId = params['data'] as string;
        this.profileService.getMyTimeLinePosts(userId).subscribe({
          next:(res)=>{
            if(res.data){
              this.postAvatar = res.data.myProfile.avatars;
              this.postBanner = res.data.myProfile.banners;
              this.myPost = res.data.myPost;
              this.userInfo = res.data.myProfile;
              console.log(res.data.avatars)
            }
          }
        })
      }
    });
  }

}
