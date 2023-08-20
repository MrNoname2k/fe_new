import { Directive, ElementRef, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appScrollBottom]'
})

export class ScrollBottomDirective implements OnChanges, AfterViewInit {

  @Input() public scrollBottom: boolean = true;


  public constructor (private el: ElementRef) {

  }

  public ngOnChanges (changes: SimpleChanges): void{
    if (changes['scrollBottom'] && changes['scrollBottom'].currentValue) {
      this.scrollToBottom();
    }
  }

  public ngAfterViewInit(): void {
    this.scrollToBottom();
  }


  public scrollToBottom (): void {
    const element = this.el.nativeElement as HTMLElement;
    element.scrollTop = 350;
  }

}
