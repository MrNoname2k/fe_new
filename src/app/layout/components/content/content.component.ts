import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { Post, PostPage } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnChanges {
  @Input() public postData!: PostPage;
  @Input() public type!: string;

  public postList: Post[] = []

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['postData'] && changes['postData'].currentValue) {
      this.postData = clone(changes?.['postData'].currentValue);
      this.postList = this.postData.results;
      if (this.type === 'profile') {
        this.postList = this.postList.slice().reverse();
        console.log("🚀 ~ file: content.component.ts:23 ~ ContentComponent ~ ngOnChanges ~ this.postList:", this.postList)
      } else {
        this.postList = this.postData.results;
        console.log("🚀 ~ file: content.component.ts:26 ~ ContentComponent ~ ngOnChanges ~ this.postList:", this.postList)
      }
    }
  }

  ngOnInit(): void {

  }
}
