/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Directive,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  AfterViewInit,
  OnInit,
  ChangeDetectorRef,
  Input,
  ContentChildren,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appEnterEvent]'
})
export class EnterEventDirective {
  @ContentChildren('InputField') public inputFields!: QueryList<ElementRef>;
  public index!: number;

  public constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keydown', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13) {

      event.preventDefault();


      const elements = Array.from(document.querySelectorAll('*[tabindex="0"]:not([disabled]):not([type="button"]):not([role="option"])'));

      const currentElement = document.activeElement as HTMLElement;

      const currentIndex = elements.indexOf(currentElement);
      const nextIndex = currentIndex + 1;
      const nextElement = elements[nextIndex] as HTMLElement;

      if(nextElement) {
       const a = this.el.nativeElement as HTMLElement;

        nextElement.focus();
      }



    }
  }
}
