import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { HttpService } from 'src/app/core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpService{

  constructor(protected override http: HttpClient,private dataService:SendDataService) { super(http)}

  public getMyTimeLinePosts(id:string): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETTIMELINEPOST}/${id}`).pipe(
      map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public getMyAbout(id:string): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETMYABOUT}/${id}`).pipe(
      map((response: HttpClientResponse) => response)
    ) as Observable<HttpClientResponse>;
  }
}
