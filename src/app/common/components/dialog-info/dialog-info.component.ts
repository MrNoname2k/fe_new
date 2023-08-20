import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss'],
})
export class DialogInfoComponent {
  public image: string = '';
  public title: string = '';
  public verifyCode!: string;

  public constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit(): void {
    if (this.data) {
      this.image = this.getImage(this.data.type);
      this.title = this.getTitle(this.data.type);
    }
  }

  public dissmiss(): void {
    this.dialogRef.close();
  }

  public sendVerifyCode(): void {
    if (this.verifyCode) {
      this.dialogRef.close(this.verifyCode);
    }
  }

  public getImage(type: string): string {
    switch (type) {
      case 'success':
        return '../../../../assets/images/icons/info.png';
      case 'congratulation':
        return '../../../../assets/images/icons/congratulation.png';
      case 'info':
        return 'info';

      case 'error':
        return '../../../../assets/images/icons/check.png';

      case 'warning':
        return '../../../../assets/images/icons/check.png';

      case 'delete':
        return '../../../../assets/images/icons/delete.png';

      case 'update':
        return '../../../../assets/images/icons/add.png';

      default:
        return '../../../../assets/images/icons/verification1.png';
    }
  }

  public getTitle(type: string): string {
    switch (type) {
      case 'success':
        return 'Success';

      case 'info':
        return 'Information';
      case 'congratulation':
        return 'Congratulation';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'delete':
        return 'Delete comment?';
      case 'update':
        return 'Updating information';
      default:
        return 'Verification';
    }
  }
}
