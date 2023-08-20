import { Component, OnInit } from '@angular/core';
import { HttpClientResponse } from '../core/models/http-response';
import {
  HomePageResponse, User,
} from './models/home-response';
import { HomeService } from './services/home.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public homeData!: HttpClientResponse;
  public homeDataResponse: HomePageResponse = {};
  public userInfo!: User;


  public constructor(
    private homeService: HomeService,
    private router: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const userId = localStorage.getItem('id')!;
    this.getDataForHomePage(userId);
  }

  public getDataForHomePage(userId: string) {
    this.homeService.getDataForHomePage(userId).subscribe({
      next: (res) => {
        if (res.meta.code === '200') {
          this.homeData = res;
          this.homeDataResponse = this.homeData.data;
          this.userInfo = this.homeData.data.userEntity;
        }
      },
    });
  }
}
