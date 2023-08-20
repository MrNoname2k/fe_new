import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagesComponent } from './pages.component';
import { AboutComponent } from './components/about/about.component';
import { PhotosComponent } from './components/photos/photos.component';
import { FriendsComponent } from './components/friends/friends.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
      { path: 'photos', component: PhotosComponent, canActivate: [AuthGuard]},
      { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
      { path: 'your-account', component: AccountComponent, canActivate: [AuthGuard]},

    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
