import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class UserReservationService {
  loggedInUserId: number = 0;
  constructor(private http: HttpClient) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    this.loggedInUserId = loggedInUser.id;
  }

  getAllFutureReservation(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/api/user/booking/futurereservation/${this.loggedInUserId}`
    );
  }

  getAllPastReservation(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/api/user/booking/pastreservation/${this.loggedInUserId}`
    );
  }

  getCurrentReservation(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `http://localhost:8080/api/user/booking/currentreservation/${this.loggedInUserId}`
    );
  }

  cancelReservationById(cancelId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/user/booking/delete/${cancelId}/${this.loggedInUserId}`
    );
  }
}
