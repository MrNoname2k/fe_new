import { Injectable } from '@angular/core';
import { Message } from '../../models/message';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpClientResponse } from '../../models/http-response';
import { HttpService } from '../http/http.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class MessageService extends HttpService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllMessages(id: string): Observable<HttpClientResponse> {
    return this.get(`${API_URL}/message/all/${id}`)
      .pipe(
        map((response: HttpClientResponse) => response)
      ) as Observable<HttpClientResponse>;
  }

  getAllFriendMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${API_URL}/message/friend`);
  }

  sendNewMessage(message: Message): Observable<any> {
    return this.http.post<Message>(
      API_URL + '/app/message',
      JSON.stringify(message)
    );
  }
}
