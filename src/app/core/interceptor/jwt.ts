import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable()
export class JsonTokenWebInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService
  ) {}

  public intercept(request: HttpRequest<any> , next: HttpHandler) {
    // const authToken = localStorage.getItem('id_token');
    const authToken = this.cookieService.get('access_token');

    if(authToken != null){
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken
        }
      })
    }

    return next.handle(request);
  }

}
