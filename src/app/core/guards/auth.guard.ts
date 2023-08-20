import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isNull } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { Observable, isEmpty } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogInfoComponent } from 'src/app/common/components/dialog-info/dialog-info.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(
    public router: Router,
    public authService: AuthService,
    public dialog: MatDialog,
    private cookieService: CookieService
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.cookieService.get('access_token')

      if(token === '') {
        this.router.navigate(['/login']);
      }
    return true;
  }

}
