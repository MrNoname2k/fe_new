import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';
import { Post } from '../models/home-response';
import { ApiPath } from 'src/app/core/config/api-path';
import { Observable, map } from 'rxjs';
import { HttpClientResponse } from 'src/app/core/models/http-response';

@Injectable({
  providedIn: 'root',
})
export class LikeService extends HttpService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  public creatLike(post: Post): Observable<HttpClientResponse> {
    return this.post(ApiPath.LIKE, post).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }
}
