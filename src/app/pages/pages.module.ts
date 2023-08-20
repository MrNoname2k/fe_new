import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { AngularMaterialModule } from '../common/angular-material/angular-material.module';
import { CommonAppModule } from '../common/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesComponent } from './pages.component';
import { AboutComponent } from './components/about/about.component';
import { PhotosComponent } from './components/photos/photos.component';
import { FriendsComponent } from './components/friends/friends.component';
import { LikeService } from './services/like.service';
import { CommentService } from './services/comment.service';
import { AccountComponent } from './components/account/account.component';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    PagesComponent,
    AboutComponent,
    PhotosComponent,
    FriendsComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonAppModule.forRoot(),
    LayoutModule,
    MatButtonModule
  ],
  providers: [
    LikeService,
    CommentService,
    UserService,
    NotificationService
  ]
})
export class PagesModule { }
