import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginModelResponse, UserLogin } from '../../models/login-model';
import { Utils } from 'src/app/common/utils/utils';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from 'src/app/common/components/dialog-info/dialog-info.component';
import { Router } from '@angular/router';
import { User } from '../../models/sign-up';
import { CookieService } from 'ngx-cookie-service';
import { SendDataService } from 'src/app/core/service/data/send-data.service';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';
import { ForgotpassDialogComponent } from 'src/app/common/components/forgotpass-dialog/forgotpass-dialog.component';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  public constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private cookieService: CookieService,
    private dataService: SendDataService,
    private navigate:NavigatePageService,
  ) {
    this.initialForm();
  }
  ngOnInit(): void {
    if (localStorage.getItem('id') != null) {
      this.navigate.navigate('/home');
    }
  }

  public loginForm: FormGroup = new FormGroup({});
  public registerForm: FormGroup = new FormGroup({});
  public user!: LoginModelResponse;
  public utils = Utils;
  public errorMessage: string = '';
  public hide = true;
  public country = [];

  public submitLoginForm(): void {
    const data: UserLogin = this.loginForm.value;

    if (this.loginForm.status === 'INVALID') {
      this.openDialog('warning', 'Please enter a valid ussername or password');
      return;
    }

    this.authService.onLogin(data).subscribe({
      next: (res) => {
        if (res.meta.code !== '200') {
          this.openDialog('error', res.meta.message);
        } else {
          this.cookieService.set('access_token', res.data.token);
          this.cookieService.set('email', res.data.userEntity.mail);
          const email = res.data.userEntity.mail;

          this.dataService.setEmail(email);
          localStorage.setItem('id', res.data.userEntity.id);

          this.router.navigate(['home']);

        }
      },
    });
  }

  public submitRegisterForm(): void {
    const data = this.registerForm.value;

    if (this.registerForm.invalid) {
      this.openDialog('warning', 'Please enter a valid information');
      return;
    }

    const userInfo: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      mail: data.mail,
      password: data.password,
      gender: data.gender,
      address: data.address,
    };

    console.log(userInfo);


    this.authService.onSignUp(userInfo).subscribe({
      next: (res) => {
        if (res.meta.code !== '200') {
          this.openDialog('error', res.meta.message);
        } else {
          this.openDialog('success', res.meta.message, this.registerForm);
        }
      },
    });
  }

  private initialForm(): void {
    this.loginForm = this.fb.group({
      mail: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.registerForm = this.fb.group({
      mail: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      gender: new FormControl(null, {
        validators: [Validators.required],
      }),
      age: new FormControl(null, {
        validators: [Validators.required],
      }),
      address: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  public openDialog(type: string, message: string, form?: FormGroup): void {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '35%',
      height: 'auto',
      data: { type: type, message: message },
      disableClose: true,
      panelClass: 'dialog-info',
      backdropClass: 'dialog-backdrop',
    });

    dialogRef.afterClosed().subscribe(() => {
      if (form) {
        this.resetForm(form);
      }
    });
  }

  public openForgotPass() {
    this.dialog.open(ForgotpassDialogComponent, {
      width: '600px',
      height: '90%',
      disableClose: true,
      position: { top: '3%' }
    });
  }

  public resetForm(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].reset(null, { emitEvent: false });
      form.controls[key].setErrors(null, { emitEvent: false });
    });
  }
}
