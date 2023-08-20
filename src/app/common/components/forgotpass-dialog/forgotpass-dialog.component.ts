import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-forgotpass-dialog',
  templateUrl: './forgotpass-dialog.component.html',
  styleUrls: ['./forgotpass-dialog.component.scss']
})
export class ForgotpassDialogComponent implements OnInit {

  mail: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public submit(): void {
    console.log("🚀 ~ file: forgotpass-dialog.component.ts:20 ~ ForgotpassDialogComponent ~ this.authService.forgotPass ~ this.mail:", this.mail)
    this.authService.forgotPass({ mail: this.mail }).subscribe({
      next: (res) => {

      },
    });
  }

}
