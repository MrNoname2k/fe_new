import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { FirebaseService } from 'src/app/core/service/firebase/firebase.service';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'postImagePipe'
})

export class PostImagePipePipe implements PipeTransform {

  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute
    ) {}

  transform(post: any): Observable<string[]> {

    let userId: string = localStorage.getItem('id')!;
    let data: string = '';
    this.route.queryParams.subscribe((params) => {
      if (params['userId']) {
        userId = params['userId'] as string;
      }
      if (params['data']) {
        data = params['data'] as string;
      }
    });

    if (!post || !post.fileEntities) {
      return of([]);
    }

    const imageUrlObservables: Observable<string>[] = post.fileEntities.map((file: any) => {
      let url = '';

      if(post.idUserCreate) {
        url = `${environment.imagePath}/users/${post.idUserCreate.id}/${file.fileName}`
      }else if(data) {
        url = `${environment.imagePath}/users/${data}/${file.fileName}`
      }else {
        url = `${environment.imagePath}/users/${userId}/${file.fileName}`
      }
      return this.firebaseService.getImageUrl(url);
    });

    return forkJoin(imageUrlObservables);
  }

}


