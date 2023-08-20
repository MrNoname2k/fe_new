import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpService } from 'src/app/core/service/http/http.service';
import { LoginModelRequest } from '../models/login-model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/sign-up';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientResponse } from 'src/app/core/models/http-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpService {
  constructor(
    protected override http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    super(http);
  }

  public onSignUp(user: User): Observable<any> {
    return this.http.post(ApiPath.REGISTER, user);
  }

  public onLogin(data: LoginModelRequest): Observable<any> {
    return this.http.post<any>(ApiPath.LOGIN, data);
  }

  public forgotPass(data: { mail: string }): Observable<any> {
    return this.http.post<any>(ApiPath.FORGOT_PASSWORD, data);
  }

  public confirmForgotPass(
    required: string,
    pwd: string,
    expired: string
  ): Observable<HttpClientResponse> {
    return this.http
      .get(
        `${ApiPath.CONFIRM_FORGOT_PASSWORD}?required=${required}&pwd=${pwd}&expired=${expired}`
      )
      .pipe(map((response: any) => response)) as Observable<HttpClientResponse>;
  }

  public doLogout(): void {
    let tokenRemoving = this.cookieService.delete('access_token');
    let emailRemoving = this.cookieService.delete('email');
    localStorage.removeItem('email');
    if (tokenRemoving == null && emailRemoving == null) {
      this.router.navigate(['login']);
    }
  }

  public onChangePasswordRequest(data: any): Observable<HttpClientResponse> {
    return this.http.post<any>(ApiPath.CHANGE_PASSWORD, data);
  }

  public conConfirmChangePass(
    required: string,
    pwd: string,
    expired: string
  ): Observable<HttpClientResponse> {
    return this.http
      .get(
        `${ApiPath.CONFIRM_CHANGE}?required=${required}&pwd=${pwd}&expired=${expired}`
      )
      .pipe(map((response: any) => response)) as Observable<HttpClientResponse>;
  }

  public setAccessTokenCookie(token: string, expirationTime: number) {
    let expires = new Date();
  }

  public checkCode(data: { code: string; mail: string }): Observable<any> {
    return this.http.post(ApiPath.CHECK_CODE, data);
  }
}
