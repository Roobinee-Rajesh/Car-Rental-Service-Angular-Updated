import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Reservation } from 'src/app/model/reservation';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class StaffReservationService {
  loggedInUserId: number = 0;
  constructor(private http: HttpClient) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    this.loggedInUserId = loggedInUser.id;
  }
  cancelReservationById(reservation: Reservation): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/staff/reservation/delete/${this.loggedInUserId}`,reservation
    );
  }
}
