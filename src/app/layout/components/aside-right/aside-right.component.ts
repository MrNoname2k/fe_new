import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { AsideBarData } from 'src/app/pages/models/home-response';

@Component({
  selector: 'app-aside-right',
  templateUrl: './aside-right.component.html',
  styleUrls: ['./aside-right.component.scss']
})
export class AsideRightComponent implements OnChanges{

  @Input() asideRightData!: AsideBarData;

  public asideBarKeys: string[] = [];
  public asideData!: AsideBarData;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['asideRightData'] && changes['asideRightData'].currentValue) {
      this.asideRightData = clone(changes['asideRightData'].currentValue);

      if(this.asideRightData) {
        this.asideData = this.asideRightData;
        this.asideBarKeys = Object.keys(this.asideRightData);
      }

    }

  }



}
