import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  password: string = "";

  constructor(private authService: AuthService, private navigate: NavigatePageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public submit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const idUser = params['required'] as string;
      const expired = params['expired'] as string;
      this.authService.confirmForgotPass(idUser, this.password, expired).subscribe({
        next: (res) => {
          this.navigate.navigate('/login');
        },
      });
    })

  }

}
