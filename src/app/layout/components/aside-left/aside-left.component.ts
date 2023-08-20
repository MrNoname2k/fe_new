import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { AsideBarData } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside-left.component.html',
  styleUrls: ['./aside-left.component.scss']
})

export class AsideLeftComponent implements OnChanges {

  @Input() public asideLeftData!: AsideBarData;
  public asideBarKeys: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['asideLeftData'] && changes['asideLeftData'].currentValue) {
      this.asideLeftData = clone(changes['asideLeftData'].currentValue);

      this.asideBarKeys = Object.keys(this.asideLeftData);
    }

  }

}
