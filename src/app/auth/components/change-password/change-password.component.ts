import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Meta } from '@angular/platform-browser';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  public rsult!: string;
  public type!: string;
  constructor(private activatedRoute:ActivatedRoute,private authService : AuthService,private toastService: ToastrService,private navigateService:NavigatePageService){}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const idUser = params['required'] as string;
      const newPass = params['pwd'] as string;
      const expired = params['expired'] as string;
      this.authService.conConfirmChangePass(idUser, newPass, expired).subscribe({
        next : (res) =>{
          if(res.meta.code === '200'){
            this.rsult = "Pass"
          }else if(res.meta.code === '400'){
            this.rsult = "Expire"
          }else{
            this.rsult = "Error"
          }
        }

      })
    })
  }

  onSubmit(){
    this.type = this.rsult;
    console.log(this.type)
  }

  onHandle(type:any){
    if(type == '0'){
      this.navigateService.navigate('/login');
    }else{
      
    }
  }

}
