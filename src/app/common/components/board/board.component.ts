import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { clone } from 'lodash';
import { AsideBarData } from 'src/app/pages/models/home-response';
import { Utils } from '../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { RelationshipService } from 'src/app/pages/services/relationship.service';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnChanges, OnInit {

  @Input() asideData!: AsideBarData;
  @Input() key!: string;

  public utils = Utils;
  public userId: string = '';

  public constructor(private route: ActivatedRoute, private relationshipService: RelationshipService, public navigateService: NavigatePageService) {

  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['userId']) {
        this.userId = params['userId'] as string;
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asideData'] && changes['asideData'].currentValue) {
      this.asideData = clone(changes['asideData'].currentValue);
    }

    if (changes['key'] && changes['key'].currentValue) {
      this.key = clone(changes['key'].currentValue);
    }
  }

  addFriend(id?: string) {
    if (id) {
      this.relationshipService.addFriend({ idUserEntityTow: id }).subscribe({
        next: (res) => {
          console.log(res);

        }
      });
    }
  }

  getBoardTitle(boardName: string): string {
    switch (boardName) {
      case 'notifications':
        return 'Recent Notifications';
      case 'news':
        return 'News';
      case 'friendZone':
        return 'FriendZone';
      default:
        return 'Notifications';
    }
  }

}
