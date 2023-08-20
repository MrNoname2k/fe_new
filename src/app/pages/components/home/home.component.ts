import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/common/components/share-dialog/share-dialog.component';

import { PostService } from '../../services/post.service';
import { ProgressSnipperComponent } from 'src/app/layout/components/progress-snipper/progress-snipper.component';
import { ToastrService } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { AsideBarData, Post, PostPage, User } from '../../models/home-response';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogInfoComponent } from 'src/app/common/components/dialog-info/dialog-info.component';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CookieService],
})
export class HomeComponent implements OnInit {
  public postData!: any[];
  public homeData!: HttpClientResponse;
  public userInfo!: User;
  public postPageData!: PostPage;
  public postAvatar!: Post[];
  public postBanner!: Post[];
  public asideRightData!: AsideBarData;
  public asideLeftData!: AsideBarData;

  constructor(
    private dialog: MatDialog,
    private postService: PostService,
    private toastService: ToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('id')!;
    this.getDataForHomePage(userId);

    this.postData = [];
  }

  public opentDialog(event: any): void {
    if (event) {
      this.shareDialogHandler();
    }
  }

  public shareDialogHandler(): void {
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: '600px',
      height: 'auto',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      position: { top: '1.75rem' },
      disableClose: true,
      data: {
        type: 'post',
      },

    });

    dialogRef.componentInstance.postEvent.subscribe((val: FormData) => {

      if (val) {
        const timeStart = performance.now();
        const spinner = this.spinnerDialog();

        this.postService.creatPost(val).subscribe({
          next: (res) => {
            const timeEnd = performance.now();
            const timeDelay = timeEnd - timeStart;

            setTimeout(() => {
              spinner.close();

              if (res.meta.code !== '201') {
                dialogRef.close('failed');
              } else {
                dialogRef.close('done');
              }
            }, timeDelay);
          },
          error: (error) => {
            this.toastService.error('Upload Fail!');
          },
        });
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'done') {
        this.toastService.success('Upload Successfully!');
      } else if (data === 'failed') {
        this.toastService.error('Upload Fail!');
      }
    });
  }

  public spinnerDialog() {
    const dialogRef = this.dialog.open(ProgressSnipperComponent, {
      width: '70px',
      height: '70px',
      disableClose: true,
    });

    return dialogRef;
  }

  public openDialogInfo(
    type: string,
    message: string
  ): MatDialogRef<DialogInfoComponent> {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '35%',
      height: 'auto',
      data: { type: type, message: message },
      disableClose: true,
      panelClass: 'dialog-info',
      backdropClass: 'dialog-backdrop',
    });

    return dialogRef;
  }

  public getDataForHomePage(userId: string) {
    this.homeService.getDataForHomePage(userId).subscribe({
      next: (res) => {
        if (res.meta.code === '200') {
          this.homeData = res;
          console.log("🚀 ~ file: home.component.ts:136 ~ HomeComponent ~ this.homeService.getDataForHomePage ~ res:", res);

          if (this.homeData) {
            this.postPageData = this.homeData.data.postEntityPage;
            this.postAvatar = this.homeData.data.userEntity.avatars;
            this.postBanner = this.homeData.data.userEntity.banners;
            this.userInfo = this.homeData.data.userEntity;

            this.asideRightData = {
              notifications: this.homeData.data.notificationEntityPage.results,
              news: [
                { image: 'assets/images/profile/profile-small-1.jpg', title: 'New Technologies', subTitle: 'Exclusive interviews with prominent Asian' },
                { image: 'assets/images/profile/profile-small-1.jpg', title: 'New Technologies', subTitle: 'Exclusive interviews with prominent Asian' },
                { image: 'assets/images/profile/profile-small-1.jpg', title: 'New Technologies', subTitle: 'Exclusive interviews with prominent Asian' },
                { image: 'assets/images/profile/profile-small-1.jpg', title: 'New Technologies', subTitle: 'Exclusive interviews with prominent Asian' },
                { image: 'assets/images/profile/profile-small-1.jpg', title: 'New Technologies', subTitle: 'Exclusive interviews with prominent Asian' },
              ],

            }

            this.asideLeftData = {
              friendZone: this.homeData.data.recommendFriends
            }

            if (this.userInfo && this.userInfo.status !== 'updated') {
              const dialogRef = this.openDialogInfo(
                'update',
                'Please update your information!'
              );

              dialogRef.afterClosed().subscribe((val) => {
                if (val === 'update') {
                  this.router.navigate(['your-account'], {
                    queryParams: { userId: this.userInfo.id },
                  });
                }
              });
            }
          }
        }
      },
    });
  }
}

