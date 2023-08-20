import { ObserversModule } from '@angular/cdk/observers';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { clone } from 'lodash';
import { Observable, from, mergeMap, of, toArray } from 'rxjs';
import { CommentDialogComponent } from 'src/app/common/components/comment-dialog/comment-dialog.component';
import { ViewerDialogComponent } from 'src/app/common/components/viewer-dialog/viewer-dialog.component';
import { Utils } from 'src/app/common/utils/utils';
import { FirebaseService } from 'src/app/core/service/firebase/firebase.service';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';
import { FileEntity, Post } from 'src/app/pages/models/home-response';
import { PostService } from 'src/app/pages/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit, OnChanges {
  @Input() public postList!: Post[];

  public userId: string = '';
  public utils = Utils;
  public avatarPost!: Post;

  public defaultImage = '../../../../../assets/images/gift/spinner.gif';

  constructor(
    private dialog: MatDialog,
    public navigateService: NavigatePageService,
    private router: ActivatedRoute,
    private postService: PostService,
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['postList'] && changes['postList'].currentValue) {
      this.postList = clone(changes?.['postList'].currentValue);
      const avatar = this.postList.find((avt)=>{
        return avt.fileEntities[0].isCurrenAvatar === 0;
      })
      this.avatarPost = avatar as Post;
    }
  }

  public ngOnInit(): void {
    this.userId = localStorage.getItem('id')!;
    console.log(this.postList)
  }

  public openComment(post: Post) {
    this.dialog.open(CommentDialogComponent, {
      width: '600px',
      height: '90%',
      data: post,
      disableClose: true,
      position: { top: '3%' }
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.postService.getPostOfFriends(this.userId).subscribe({
        next: (res) => {
          console.log("🚀 ~ file: post-card.component.ts:68 ~ PostCardComponent ~ this.postService.getPostOfFriends ~ res:", res)
          this.postList = res.data.results;
        }
      })
    })
  }

  public openViewerDialog(post: Post): void {
    this.dialog.open(ViewerDialogComponent, {
      width: '100%',
      height: '100%',
      data: post,
      disableClose: true,
    });
  }
}
