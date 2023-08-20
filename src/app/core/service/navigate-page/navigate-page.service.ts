import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatePageService {

  constructor(private router: Router) { }

  public navigateToPage(page: string, data: any) {
    this.router.navigate([page], {queryParams: {data: data}});
  }

  public navigate(page: string) {
    this.router.navigate([page]);
  }
}
