import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Comment, Post } from 'src/app/pages/models/home-response';
import { CommentService } from 'src/app/pages/services/comment.service';
import { Utils } from '../../utils/utils';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentDialogComponent implements OnInit {
  public post!: Post;
  public defaultImage = '../../../../../assets/images/gift/spinner.gif';
  public commentText: string | null = '';
  public editText: string = '';
  public editReplyText: string = '';
  public replyText: string | null = '';
  public userId: string = '';
  public utils = Utils;
  public commentList: Comment[] = [];
  public isShow!: number;
  public showReplyIndex!: number;
  public editIndex!: number;
  public editReplyIndex!: number;
  public commentTransport: any[] = [];
  public replyCommentSlicing: any[] = [];
  public displayComment: any[] = [];
  public displayReply: Comment[] = [];
  public numberOfComments: number = 3;
  public numberOfReplys: number = 0;

  public constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private commentService: CommentService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    public navigateService: NavigatePageService
  ) { }

  public ngOnInit(): void {
    if (this.data) {
      this.post = this.data;
      console.log("🚀 ~ file: comment-dialog.component.ts:53 ~ CommentDialogComponent ~ ngOnInit ~ this.post:", this.post)
      this.commentList = this.post.comments;
      console.log("🚀 ~ file: comment-dialog.component.ts:55 ~ CommentDialogComponent ~ ngOnInit ~ this.commentList:", this.commentList)

      for (let comment of this.commentList) {
        let commentGroup!: any;
        if (comment.idComment === null) {
          const arr = this.commentList.filter((cmt) => {
            return comment.id === cmt.idComment;
          });

          commentGroup = {
            mainComment: comment,
            replyComments: arr,
          };

          this.commentTransport.push(commentGroup);
        }
      }
    }

    // this.router.queryParams.subscribe((params) => {
    //   if (params['userId']) {
    //     this.userId = params['userId'] as string;
    //   }else{
        this.userId = localStorage.getItem('id')!;
      // }
    // });
  }

  public sendReply(id: string) {
    if (id && this.replyText) {
      const comment = {
        content: this.replyText,
        idPost: this.post.id,
        idComment: id,
      };

      this.commentService.sendComment(comment).subscribe({
        next: (res) => {
          if (res.meta.code === '201') {
            this.commentTransport.forEach((commentTransport) => {
              if (res.data.idComment === commentTransport.mainComment.id) {
                commentTransport.replyComments.push(res.data);
              }
            });
            this.replyText = null;
            this.isShow = -1;
            this.showReplyIndex = -1;
            this.editReplyIndex = -1;
          }
        },
      });
    }
  }

  public sendComment() {
    if (this.commentText) {
      let comment = {
        content: this.commentText,
        idPost: this.post.id,
      };

      this.commentService.sendComment(comment).subscribe({
        next: (res) => {
          if (res.meta.code === '201') {
            this.commentTransport.push({
              mainComment: res.data,
              replyComments: [],
            });
            this.commentText = null;
          }
        },
      });
    }
  }

  public loadmore(type: string) {
    if (type === 'reply') {
      this.numberOfReplys += 3;
    } else {
      this.numberOfComments += 3;
    }
  }

  public deleteComment(id: any) {
    const dialogRef = this.openDialogInfo(
      'delete',
      'Do you want to delete this comment?'
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'del') {
        this.commentService.deleteComment(id).subscribe({
          next: (res) => {
            if (res.meta.code === '200') {
              this.commentTransport = this.commentTransport.filter(
                (comment) => {
                  return comment.mainComment.id !== id;
                }
              );
            }
          },
        });
      }
    });
  }

  public deleteReplyComment(id: any) {
    const dialogRef = this.openDialogInfo(
      'delete',
      'Do you want to delete this comment?'
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'del') {
        this.commentService.deleteComment(id).subscribe({
          next: (res) => {
            if (res.meta.code === '200') {
              this.commentTransport.forEach((comment) => {
                comment.replyComments = comment.replyComments.filter(
                  (reply: any) => {
                    return reply.id !== id;
                  }
                );
              });
            }
          },
        });
      }
    });
  }

  public editComment(comment: Comment) {

    if (this.editText !== comment.content) {
      comment.content = this.editText;
      this.commentService.upadteComment(comment).subscribe({
        next: (res) => {
          if (res.meta.code === '200') {
            this.editIndex = -1;
          }
        },
      });
    }
  }

  public editReplyComment(comment: Comment) {
    if (this.editReplyText !== comment.content) {
      comment.content = this.editReplyText;
      this.commentService.upadteComment(comment).subscribe({
        next: (res) => {
          if (res.meta.code === '200') {
            this.editReplyIndex = -1;
          }
        },
      });
    }
  }

  public openDialogInfo(
    type: string,
    message: string
  ): MatDialogRef<DialogInfoComponent> {
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
}
