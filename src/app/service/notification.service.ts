import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
  constructor(private http: HttpClient) { }
  
  getNotification(): Observable<AppResponse>{
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/notification/getNotification/${this.loggedInUser.id}`
    );
  }

  updateViewedStatus():Observable<AppResponse>{
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/user/notification/`,this.loggedInUser.id
    );
  }
}
