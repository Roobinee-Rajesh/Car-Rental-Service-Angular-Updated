import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchRange } from 'src/app/model/searchRange';
import { StorageService } from '../storage.service';
import { AppResponse } from 'src/app/model/appResponse';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class UserBookingConfirmService {
  fromToDate: SearchRange = JSON.parse(this.storageService.getFromToDate()!);
  requestBody: SearchRange = {
    start_date: '',
    end_date: '',
    userId: 0,
    carId: 0,
  };
  loggedInUserEmail: string = this.storageService.getLoggedInUser().email;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  reserveCar(carId: number): Observable<AppResponse> {
    this.requestBody.start_date = this.fromToDate.start_date;
    this.requestBody.end_date = this.fromToDate.end_date;
    this.requestBody.carId = carId;
    this.requestBody.userId = this.storageService.getLoggedInUser().id;
    // console.log(this.fromToDate);

    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/booking/bookCar`,
      this.requestBody
    );
  }

  sendEmail(): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/email/send-email`,
      this.loggedInUserEmail
    );
  }
}
