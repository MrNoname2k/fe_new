import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent implements OnChanges {
  @Input() public fb!: string;
  @Input() public ig!: string;
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['fb'] && changes['fb'].currentValue) {
      this.fb = clone(changes?.['fb'].currentValue);
    }
    if (changes['ig'] && changes['ig'].currentValue) {
      this.ig = clone(changes?.['ig'].currentValue);
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
