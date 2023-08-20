import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { clone } from 'lodash';
import { Album, AlbumResponse, FileEntity, Post } from 'src/app/pages/models/about';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnChanges,OnInit{

  @Input() public albumData!: AlbumResponse;
  public data!: AlbumResponse;
  public post! : Post;
  public url : any;
  constructor(private route:ActivatedRoute){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albumData'] && changes['albumData'].currentValue) {
      this.albumData = clone(changes?.['albumData'].currentValue);
      this.data = this.albumData;
      this.post = this.data.posts[0];
      console.log(this.data.album.name);

    }
  }
  ngOnInit(): void {
    this.mapData()
  }

  mapData(){

    this.data = this.albumData;
  }

  // transform(post: Post): Observable<string[]> {

  //   let userId: string = '';
  //   this.route.queryParams.subscribe((params) => {
  //     if (params['data']) {
  //       userId = params['data'] as string;
  //     }
  //   });

  //   if (!post || !post.fileEntities) {
  //     return of([]);
  //   }

  //   const imageUrlObservables: Observable<string>[] = post.fileEntities.map((file: FileEntity) => {
  //     let url = '';

  //     if(userId) {
  //       url = `${environment.imagePath}/users/${userId}/${file.fileName}`
  //     }else {
  //       url = `${environment.imagePath}/users/${userId}/${file.fileName}`
  //     }
  //     return this.filebaseService.getImageUrl(url);
  //   });

  //   return forkJoin(imageUrlObservables);
  // }

}
