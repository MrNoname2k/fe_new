import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/common/components/share-dialog/share-dialog.component';
import { SendDataService } from 'src/app/core/service/data/send-data.service';

import { Post, User } from '../../models/home-response';


import { ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/auth/models/login-model';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProgressSnipperComponent } from 'src/app/layout/components/progress-snipper/progress-snipper.component';
import { PostService } from '../../services/post.service';
import { DatePipe } from '@angular/common';
import { DialogInfoComponent } from 'src/app/common/components/dialog-info/dialog-info.component';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/services/auth.service';

export interface changeJson{
  mail:string,
  password:string,
  oldPass:string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public userEntity: User = {
    address: '',
    birthDay: '',
    gender: '',
    lastLoginDate: '',
    linkIg: '',
    mail: '',
    online: false,
    passwords: '',
    phone: '',
    status: '',
    id: '',
    delFlg: 0,
    firstName: '',
    lastName: '',
    description: '',
    city: '',
    linkFacebook: '',
    posts: [],
  };

  public updateUserForm: FormGroup = new FormGroup({});
  public changePasswordForm: FormGroup = new FormGroup({});
  public post!: Post;
  public banner!: Post;
  public postList: Post[] = [];
  public isDisabled: boolean = true;
  public userId: string = '';

  public isSelect = 'myAccount';


  public constructor(
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private postService: PostService,
    private toastService: ToastrService,
    private cookie : CookieService,
    private authService:AuthService
  ) {}

  public ngOnInit(): void {
    this.userId = localStorage.getItem('id')!;

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((res) => {
        if (res.meta.code === '200') {
          if (res.data) {
            this.userEntity = res.data;

            if (this.userEntity.posts) {
              this.postList = this.userEntity.posts;

              const postAvatar = this.postList.filter((post) => {
                return (
                  post.typePost === 'avatar' &&
                  post.fileEntities[0]?.isCurrenAvatar === 0
                );
              });

              const postBanner = this.postList.filter((post) => {
                return (
                  post.typePost === 'banner' &&
                  post.fileEntities[0]?.isCurrenAvatar === 0
                );
              });

              this.post = postAvatar[0];
              this.banner = postBanner[0];
            }

            this.initialForm();
          }
        }
      });
    }

    this.initialForm();
  }

  public openUploadDialog(type: string) {

    const dialog = this.dialog.open(ShareDialogComponent, {
      width: '600px',
      height: 'auto',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      position: { top: '1.75rem' },
      disableClose: true,
      data: {
        type: type,
        posts: this.userEntity.posts,
      },
    });

    dialog.componentInstance.postEvent.subscribe((val: FormData) => {
      if (val) {
        const timeStart = performance.now();
        const spinner = this.spinnerDialog();

        if (type === 'avatar') {
          this.postService.creatAvatar(val).subscribe({
            next: (res) => {
              const timeEnd = performance.now();
              const timeDelay = timeEnd - timeStart;

              setTimeout(() => {
                spinner.close();

                if (res.meta.code !== '201') {
                  dialog.close('failed');
                } else {
                  dialog.close('done');
                  this.post = res.data;
                }
              }, timeDelay);
            },
          });
        } else {
          this.postService.creatBanner(val).subscribe({
            next: (res) => {
              const timeEnd = performance.now();
              const timeDelay = timeEnd - timeStart;
              setTimeout(() => {
                spinner.close();

                if (res.meta.code !== '201') {
                  dialog.close('failed');
                } else {
                  dialog.close('done');
                  this.banner = res.data;
                }
              }, timeDelay);
            },
          });
        }
      }
    });

    dialog.componentInstance.currentPostEvent.subscribe((val: Post) => {
      if (val) {
        const timeStart = performance.now();
        const spinner = this.spinnerDialog();

        if (type === 'avatar') {
          this.postService.updateAvatar(val).subscribe({
            next: (res) => {
              const timeEnd = performance.now();
              const timeDelay = timeEnd - timeStart;

              setTimeout(() => {
                spinner.close();

                if (res.meta.code !== '200') {
                  dialog.close('failed');
                } else {
                  dialog.close('done');
                  this.post = res.data;
                }
              }, timeDelay);
            },
          });
        } else {
          this.postService.updateBanner(val).subscribe({
            next: (res) => {
              const timeEnd = performance.now();
              const timeDelay = timeEnd - timeStart;

              setTimeout(() => {
                spinner.close();

                if (res.meta.code !== '200') {
                  dialog.close('failed');
                } else {
                  dialog.close('done');
                  this.banner = res.data;
                }
              }, timeDelay);
            },
          });
        }
      }
    });
  }

  public spinnerDialog() {
    const dialogRef = this.dialog.open(ProgressSnipperComponent, {
      width: '70px',
      height: '70px',
      disableClose: true,
    });

    return dialogRef;
  }

  private initialForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: new FormControl(
        null,{validators: [Validators.required]}
      ),
      newPassword: new FormControl(
        null,{validators: [Validators.required]}
      ),
      confirmPassword: new FormControl(
        null,{validators: [Validators.required]}
      )
    });
    this.updateUserForm = this.fb.group({
      firstName: new FormControl(
        this.userEntity ? this.userEntity.firstName : null,
        { validators: [Validators.required] }
      ),
      lastName: new FormControl(
        this.userEntity ? this.userEntity.lastName : null,
        { validators: [Validators.required] }
      ),
      address: new FormControl(
        this.userEntity ? this.userEntity.address : null,
        { validators: [Validators.required] }
      ),
      city: new FormControl(this.userEntity ? this.userEntity.city : null, {
        validators: [Validators.required],
      }),
      birthday: new FormControl(
        this.userEntity ? this.userEntity.birthDay : null,
        { validators: [Validators.required] }
      ),
      gender: new FormControl(this.userEntity ? this.userEntity.gender : null, {
        validators: [Validators.required],
      }),
      mail: new FormControl(this.userEntity ? this.userEntity.mail : null, {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(this.userEntity ? this.userEntity.phone : null, {
        validators: [
          Validators.required,
          Validators.pattern('^(84|0[35789])(\\d{8})$'),
        ],
      }),
      linkIg: new FormControl(this.userEntity ? this.userEntity.linkIg : null),
      linkFacebook: new FormControl(
        this.userEntity ? this.userEntity.linkFacebook : null
      ),
      description: new FormControl(
        this.userEntity ? this.userEntity.description : null,
        { validators: [Validators.required] }
      ),
    });
  }

  onChangePassword() {
     let json: changeJson = {
      mail:'',
      password:'',
      oldPass:''
     };
    if(this.changePasswordForm.valid){
      const formData = this.changePasswordForm.getRawValue();
      if(formData.newPassword != formData.confirmPassword || formData.newPassword == formData.oldPassword){
        this.toastService.error("Input Information Not Correct !");
      }else{
        json.mail = this.cookie.get('email');
        json.password = formData.newPassword;
        json.oldPass = formData.oldPassword;
        console.log(json.mail + ' <->' + json.password)
        const dialog = this.openDialogInfo('update', 'Are you sure you want to change your password?');
        dialog.afterClosed().subscribe(data => {
          if(data === 'update') {
            console.log("run =>")
            this.authService.onChangePasswordRequest(json).subscribe({
              next : (res) =>{
                switch(res.meta.code){
                  case '400' :
                    this.toastService.error("Old password is not correct !");
                    break;
                  case '500' :
                    this.toastService.error("Server Not Response.Please Contact Our Support !");
                    break;
                  case '200' :
                    this.toastService.success("Success request.Please check your email to confirm change your password!");
                    break;
                  default:
                    break;
                }
              }
            })
          }
        })
      }
    }
    else{
      this.toastService.error("Please Input Information !");
    }
  }

  public onSubmit() {
    let userEntity: User = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      birthDay: '',
      gender: '',
      linkIg: '',
      linkFacebook: '',
      mail: '',
      online: true,
      phone: '',
      status: '',
      description: '',
    };

    if (this.updateUserForm.valid) {

      const formData = this.updateUserForm.getRawValue();
      const dateSelected = formData['birthday']?._d;
      const datePipe = new DatePipe('en-US');
      const birthDay = datePipe.transform(dateSelected, 'yyyy-MM-dd HH:mm:ss');


      userEntity.firstName = formData.firstName;
      userEntity.lastName = formData.lastName;
      userEntity.address = formData.address;
      userEntity.city = formData.city;
      userEntity.phone = formData.phone;
      userEntity.mail = formData.mail;
      userEntity.linkIg = formData.linkIg;
      userEntity.linkFacebook = formData.linkFacebook;
      userEntity.gender = formData.gender;
      userEntity.description = formData.description;
      userEntity.birthDay = birthDay!;
      userEntity.id = this.userId;



      const dialog = this.openDialogInfo('update', 'Are you sure you want to update?');

      dialog.afterClosed().subscribe(data => {
        if(data === 'update') {
          this.userService.updateUser(userEntity).subscribe({
            next: (res) => {
              if(res.meta.code === '200') {
                this.toastService.success(res.meta.message);
              }else {
                this.toastService.error(res.meta.message);
              }
            }
          })
        }
      })

    }
  }

  public resetForm(): void {
    this.initialForm();
  }

  public openDialogInfo(type: string, message: string): MatDialogRef<DialogInfoComponent> {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '35%',
      height: 'auto',
      data: { type: type, message: message },
      disableClose: true,
      panelClass: 'dialog-info',
      backdropClass: 'dialog-backdrop',
    });

    return dialogRef;
  }

  goToFunc(type:string){
    this.isSelect = type;
  }
}
