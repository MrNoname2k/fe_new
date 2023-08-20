import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { HttpService } from 'src/app/core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends HttpService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public updateStatus(relationship: {fromUserId: string, toUserId: string}): Observable<HttpClientResponse> {
    return this.put(ApiPath.UPDATE_MESSAGE_STATUS, relationship).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }
}
