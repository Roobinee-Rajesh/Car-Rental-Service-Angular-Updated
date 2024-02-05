import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchRange } from 'src/app/model/searchRange';
import { AppResponse } from 'src/app/model/appResponse';
import { urlEndpoint } from 'src/app/utils/constant';
import { CarFilter } from 'src/app/model/car-filter';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserFindCarService {
  fromToDate: SearchRange = JSON.parse(this.storageService.getFromToDate()!);

  constructor(private http: HttpClient,private storageService:StorageService) {
  }

  findCars(searchRange: SearchRange): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/car/allAvailableCars/${searchRange.start_date}/${searchRange.end_date}`
    );
  }

  findCarById(carId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/car/carById/${carId}`
    );
  }

  findCarByFilter(filter: CarFilter): Observable<AppResponse> {
    filter.start_date=this.fromToDate.start_date;
    filter.end_date=this.fromToDate.end_date;
    
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/car/filteredCars/`,filter
    );
  }
}
