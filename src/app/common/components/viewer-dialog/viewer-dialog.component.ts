
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Post } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-viewer-dialog',
  templateUrl: './viewer-dialog.component.html',
  styleUrls: ['./viewer-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ViewerDialogComponent implements OnInit{

  @ViewChild('slickModal') viewer!: SlickCarouselComponent;

  public nextImage = 0;
  public isPlayed = false;
  public scaleIndex = 1;
  public post!: Post;
  public defaultImage = '../../../../../assets/images/gift/spinner.gif';

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    speed: 1000,
    useTransform: true,
    useCSS: true,
    cssEase: "ease-in-out",
    mouseWheelMove: true
  }



  constructor(public dialogRef: MatDialogRef<ViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
    ) {}


  public ngOnInit(): void {
    this.post = this.data;
  }

  slickInit(event: any): void {
    const slickTrack = event.slick.$slideTrack;
    const slickList = event.slick.$list;

    slickTrack[0].classList.add('custom-track');
    slickList[0].classList.add('custom-list');
  }


  public beforeChange(event: any): void {
  }

  public afterChange(event: any): void {
    this.nextImage = event.currentSlide;
  }

  public autoPlay(): void {
    this.isPlayed = !this.isPlayed;
    this.viewer.slickPlay();
  }

  public onPause(): void {
    this.isPlayed = !this.isPlayed;
    this.viewer.slickPause();
  }

  public onDismiss(): void {
    this.dialogRef.close();
  }

  public onZoom(action: string): void {

      if(action === 'in') {
        this.scaleIndex += 0.1;
      }else {

        this.scaleIndex -= 0.1;

      }
  }

}
