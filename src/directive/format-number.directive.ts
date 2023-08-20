/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormatNumber]'
})
export class FormatNumberDirective {

  @Input('appFormatNumber') public decimals = '';

  public constructor(private el: ElementRef, private control: NgControl) {}

  private check(value: string): RegExpMatchArray | null {
    let [length, precision] = this.decimals.split('.'),
      regExpString = `^([\\d]{0,${+length}})((\\.{1})([\\d]{1,${+precision}})?)?$`;

    return String(value).match(new RegExp(regExpString));
  }

  private formatValue(value: string): string {
    let commasRemoved = value.replace(/,/g, '');
    let toInt: number;
    let toLocale: string;

    if (commasRemoved.split('.').length > 1) {
      let decimal = isNaN(parseInt(commasRemoved.split('.')[1])) ? '' : parseInt(commasRemoved.split('.')[1]);

      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US') + '.' + decimal;
    } else {
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US');
    }

    return toLocale;
  }

  @HostListener('input', ['$event'])
  public onInput(event: any) {
    let value = event.target.value;

    if (value === '-') {
      return;
    }

    if (!this.check(value)) {
      event.target.value = this.formatValue(value);
      this.control.control?.patchValue(event.target.value, { emitEvent: false });
    }
  }

  // Get the ElementRef of input element
  @ViewChild('inputElement', { static: true }) public inputElementRef!: ElementRef<HTMLInputElement>;

  // Format the value when set through setValue
  public setValue(value: any): void {
    let formattedValue = this.formatValue(value);
    
    this.inputElementRef.nativeElement.value = formattedValue;
    this.control.control?.patchValue(formattedValue, { emitEvent: false });
  }

}
