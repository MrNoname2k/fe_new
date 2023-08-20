import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { HttpService } from 'src/app/core/service/http/http.service';
import { Post } from '../models/home-response';

@Injectable({
  providedIn: 'root'
})
export class PostService extends HttpService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public creatPost(data: FormData): Observable<HttpClientResponse> {
    return this.post(ApiPath.POST, data).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public creatAvatar(data: FormData): Observable<HttpClientResponse> {
    return this.post(ApiPath.AVATAR, data).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public creatBanner(data: FormData): Observable<HttpClientResponse> {
    return this.post(ApiPath.CREATEBANNER, data).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public getPostOfFriends(userId: string): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETPOST}/${userId}`).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public updateAvatar(post: Post): Observable<HttpClientResponse> {
    return this.put(ApiPath.UPDATEAVATAR, post).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }

  public updateBanner(post: Post): Observable<HttpClientResponse> {
    return this.put(ApiPath.UPDATEBANNER, post).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }
}
