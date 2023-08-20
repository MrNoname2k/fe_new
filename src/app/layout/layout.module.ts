import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../common/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonAppModule } from '../common/common.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';
import { PopupMenuItemComponent } from './components/popup-menu/popup-menu-item/popup-menu-item.component';
import { AsideLeftComponent } from './components/aside-left/aside-left.component';
import { AsideRightComponent } from './components/aside-right/aside-right.component';
import { ContentComponent } from './components/content/content.component';
import { PostCardComponent } from './components/content/post-card/post-card.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProfileBannerComponent } from './components/profile-banner/profile-banner.component';
import { NavigatePageService } from '../core/service/navigate-page/navigate-page.service';
import { BoxCardComponent } from './components/box-card/box-card.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { FirebaseService } from '../core/service/firebase/firebase.service';
import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PopupMenuComponent,
    PopupMenuItemComponent,
    AsideLeftComponent,
    AsideRightComponent,
    ContentComponent,
    PostCardComponent,
    ProfileBannerComponent,
    BoxCardComponent,
    AlbumCardComponent,
    FriendCardComponent,
    SecondMenuComponent,
    ProgressSnipperComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommonAppModule.forRoot(),
    SlickCarouselModule,
    LazyLoadImageModule

  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    AsideLeftComponent,
    AsideRightComponent,
    ContentComponent,
    ProfileBannerComponent,

    BoxCardComponent,
    SecondMenuComponent,
    AlbumCardComponent,
    FriendCardComponent,
    ProgressSnipperComponent
  ],
  providers: [
    NavigatePageService,
    FirebaseService,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }
  ]
})
export class LayoutModule { }
