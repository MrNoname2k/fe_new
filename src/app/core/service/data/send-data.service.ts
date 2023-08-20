import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendDataService {
  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  private dataSubject = new BehaviorSubject<any>('');
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }

  private postSubject = new BehaviorSubject<any>('');
  post$ = this.postSubject.asObservable();

  setPost(data: any) {
    this.postSubject.next(data);
  }

  private notificationSubject = new BehaviorSubject<any>('');
  notification$ = this.notificationSubject.asObservable();

  setNotification(data: any) {
    this.notificationSubject.next(data);
  }

  private messageSubject = new BehaviorSubject<any>('');
  message$ = this.messageSubject.asObservable();

  setMessage(data: any) {
    this.messageSubject.next(data);
  }


  private userSubject = new BehaviorSubject<any>('');
  user$ = this.userSubject.asObservable();

  setUser(data: any) {
    this.userSubject.next(data);
  }
}
