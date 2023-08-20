
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Post } from 'src/app/pages/models/home-response';
import { PostService } from 'src/app/pages/services/post.service';

export interface postData {
  content?: string;
  accessModifierLevel: string;
  typePost: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})

export class ShareDialogComponent implements OnInit {
  @Output() postEvent = new EventEmitter<FormData>();
  @Output() currentPostEvent = new EventEmitter<Post>();

  public media: any[] = [];
  public avatarImage: string = '';
  public isChoosed: boolean = false;
  public content: string = '';
  public files: any[] = [];
  public accessType: string = 'public';
  public formData = new FormData();
  public heading = '';
  public posts: Post[] = [];
  public currentPostChoosed!: Post;

  public constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService
  ) {}

  public ngOnInit(): void {
    if(this.data) {
      if(this.data.type === 'post') {
        this.heading = 'Share Your Mood'
      }else if(this.data.type ==='avatar'){
        this.heading = 'Update Your Avatar'
        this.posts = this.data.posts;
        this.posts = this.posts.filter(post => {
          return post.typePost === 'avatar'
        })
      }else {
        this.heading = 'Update Your Cover Photo'
        this.posts = this.data.posts;
        this.posts = this.posts.filter(post => {
          return post.typePost === 'banner'
        })
      }
    }
  }

  public onChangeFiles(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.files = files;

      for (let file of files) {
        var render = new FileReader();
        render.readAsDataURL(file);
        render.onload = (item: any) => {
          this.media.push({ url: item.target.result, type: file.type });
        };
        this.formData.append('files', file);
      }
    }
  }

  public onChangeAvatar(event: any) {

    if (event.target.files.length > 0) {
      const files = event.target.files;

        var render = new FileReader();
        render.readAsDataURL(files[0]);
        render.onload = (item: any) => {
          this.avatarImage = item.target.result;
          this.isChoosed = true;
        };
        this.formData.append('file', files[0]);

    }
  }

  public onSubmit(): void {
    let postData: postData = {
      content: this.content,
      accessModifierLevel: this.accessType,
      typePost: this.data.type,
    };

    this.formData.append('json', JSON.stringify(postData));

    this.postEvent.emit(this.formData);
  }

  public onChooseAccessType(accessType: string): void {
    this.accessType = accessType;
  }

  public chooseCurrentImage(post: Post) {
    if(post) {
      this.currentPostChoosed = post;
    }
    this.isChoosed = true;
  }

  public updateAvatar() {
    this.currentPostEvent.emit(this.currentPostChoosed);
  }


  public removeImage(index: number): void {
    this.media.splice(index, 1);
    this.formData.delete('files');
    for (let file of this.files) {
      this.formData.append('files', file);
    }
  }
}
