import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,

} from '@angular/core';


@Directive({
  selector: '[appComment]',
})
export class CommentDirective implements OnInit {
  @Input() item: any = 4;

  public showMoreButton!: HTMLElement;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
  
  }
}
