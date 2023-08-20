import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { clone } from 'lodash';
import { Notification, Relationship } from 'src/app/pages/models/home-response';

export interface PopupConfig {
  title?: string;
  apply?: string;
  data?: any;
}

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent implements OnChanges{
  @Input() popupProperties: PopupConfig= {};


  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['popupProperties'] && changes['popupProperties'].currentValue) {
      this.popupProperties = clone(changes?.['popupProperties'].currentValue);
    }
  }
}
