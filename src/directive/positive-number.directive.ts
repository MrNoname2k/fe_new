/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPositiveNumber]'
})

export class PositiveNumberDirective {

  public constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', ','];

    if (!event.ctrlKey && !event.altKey && !event.shiftKey &&
      (event.key === '.' || isNaN(Number(event.key))) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  public onPaste(event: ClipboardEvent) {
    const pasteData = event.clipboardData?.getData('text/plain');

    if (pasteData && !(/^\d*\.?\d*$/.test(pasteData))) {
      event.preventDefault();
    }

  }

  @HostListener('blur', ['$event.target.value'])
  public onBlur(value: string) {
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.el.nativeElement.value = parsedValue.toLocaleString('en-US');
    }
  }

}
