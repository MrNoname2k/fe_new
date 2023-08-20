import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { clone } from 'lodash';
import { BoxCardInfo } from 'src/app/pages/components/about/about.component';
import { Album, AlbumResponse, Friend } from 'src/app/pages/models/about';

@Component({
  selector: 'app-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})

export class BoxCardComponent implements OnChanges{

  @Input() public albums!: AlbumResponse[];
  @Input() public friends!: Friend[];
  @Input() public favouriteBooks!: BoxCardInfo;
  @Input() public favouriteSports!: BoxCardInfo;

  public data: BoxCardInfo = {};

  public dataAlbums!: AlbumResponse[];

  public dataFriends!: Friend[];

  public slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    prevArrow: null,
    nextArrow: null,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albums'] && changes['albums'].currentValue) {
      this.albums = clone(changes?.['albums'].currentValue);
      this.dataAlbums = this.albums;
      this.data.data = this.dataAlbums;
      this.data.title = 'Albums';
      this.data.type = 'albums'
      console.log(this.dataAlbums);
    }

    if (changes['friends'] && changes['friends'].currentValue) {
      this.friends = clone(changes?.['friends'].currentValue);
      this.data.data = this.friends;
      this.dataFriends = this.friends;
      this.data.title = 'Friends';
      this.data.type = 'friends';
    }

    if (changes['favouriteBooks'] && changes['favouriteBooks'].currentValue) {
      this.favouriteBooks = clone(changes?.['favouriteBooks'].currentValue);
      this.data = this.favouriteBooks;
    }

    if (changes['favouriteSports'] && changes['favouriteSports'].currentValue) {
      this.favouriteSports = clone(changes?.['favouriteSports'].currentValue);
      this.data = this.favouriteSports;
    }
  }

}
