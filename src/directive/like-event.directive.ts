import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Post } from 'src/app/pages/models/home-response';
import { LikeService } from 'src/app/pages/services/like.service';

@Directive({
  selector: '[appLikeEvent]',
})
export class LikeEventDirective {
  @Input() data!: Post;

  constructor(private el: ElementRef, private likeService: LikeService) {}

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    if (event) {
      if (this.data) {
        const listLiked = this.data.likes.map((like) => {
          if (like.delFlg === 0) {
            return like.userEntityLike.firstName + ' ' + like.userEntityLike.lastName;
          }
          return [];
        });

        this.likeService.creatLike(this.data).subscribe((res) => {

          if (res.data.delFlg === 0) {

            if (!listLiked.includes(res.data.userEntityLike.firstName + ' ' + res.data.userEntityLike.lastName)) {
              listLiked.push(res.data.userEntityLike.firstName + ' ' + res.data.userEntityLike.lastName);
            }

            this.el.nativeElement.querySelector('.listLiker').innerText =
              listLiked.join('');
          } else {
            const likeUsersAfterUnlike = listLiked.filter(
              (element) => element !== res.data.userEntityLike.firstName + ' ' + res.data.userEntityLike.lastName
            );

            this.el.nativeElement.querySelector('.listLiker').innerHTML =
              likeUsersAfterUnlike.join(', ');
          }
        });
      }
    }
  }
}
