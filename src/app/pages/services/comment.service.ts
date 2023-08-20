import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';
import { Comment } from '../models/home-response';
import { Observable, map } from 'rxjs';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { ApiPath } from 'src/app/core/config/api-path';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends HttpService{

  constructor(protected override http: HttpClient) {
    super(http)
  }

  public sendComment(comment: Object): Observable<HttpClientResponse> {
    return this.post(ApiPath.COMMENT,  comment).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }

  public deleteComment(id: string): Observable<HttpClientResponse> {
    return this.delete(`${ApiPath.DELETECOMMENT}/${id}`).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }

  public upadteComment(comment: Comment): Observable<HttpClientResponse> {
    return this.put(ApiPath.UPDATECOMMENT, comment).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }
}
