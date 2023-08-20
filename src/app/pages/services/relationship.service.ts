import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { HttpService } from 'src/app/core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService extends HttpService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public addFriend(data: {idUserEntityTow: string}): Observable<HttpClientResponse> {
    return this.post(ApiPath.ADD_FRIEND, data).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public unfriend(data: {idUserEntityTow: string}): Observable<HttpClientResponse> {
    return this.post(ApiPath.UNFRIEND, data).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }
}
