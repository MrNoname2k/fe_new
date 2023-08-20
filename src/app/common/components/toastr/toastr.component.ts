
import { Component, Inject, OnInit, } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SendDataService } from 'src/app/core/service/data/send-data.service';


@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})

export class ToastrComponent implements OnInit {
  public title: string = '';
  public message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackbarRef: MatSnackBarRef<ToastrComponent>, private dataService: SendDataService) {

  }

  public ngOnInit(): void {
    this.message = this.data.content;
    this.title = 'Notification';
    this.dataService.setNotification(this.data);
  }

  public dismiss(): void {
    this.snackbarRef.dismiss();
  }
}
