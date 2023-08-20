import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Like } from 'src/app/pages/models/home-response';

@Pipe({
  name: 'listLikePipe'
})
export class ListLikePipePipe implements PipeTransform {

  public constructor(public route: ActivatedRoute) {}

  public transform(list: Like[]): string | null {
    let userId = '';
    this.route.queryParams.subscribe((params) => {
      if (params['userId']) {
        userId =  params['userId'] as string;
      }
    });

    const usernames = list.map(item => {
      if(item.delFlg === 0) {
        return item.userEntityLike.lastName + ' ' + item.userEntityLike.firstName;
      }
      return null;
    })

    const usernamesString = usernames.join(', ');

    return usernamesString;
  }

}
