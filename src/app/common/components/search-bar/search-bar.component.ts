import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { Post, User } from 'src/app/pages/models/home-response';
import { clone } from 'lodash';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnChanges {
  @Input() public userInfo!: User;

  @Output() public openDialgEvent = new EventEmitter<string>();

  constructor(
    public navigateService: NavigatePageService
  ) { }

  public avatar!: Post;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userInfo'] && changes['userInfo'].currentValue) {
      this.userInfo = clone(changes?.['userInfo'].currentValue);
      if (this.userInfo.avatars) {
        this.avatar = this.userInfo.avatars[0] as unknown as Post;
      }
    }
  }

}
