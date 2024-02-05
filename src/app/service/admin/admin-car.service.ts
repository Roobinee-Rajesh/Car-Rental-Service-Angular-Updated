import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../../model/appResponse';
import { Observable } from 'rxjs';
import { Car } from '../../model/car';
import { urlEndpoint } from '../../utils/constant';
import { NgForm } from '@angular/forms';
import { AdminFilter } from 'src/app/model/admin-filter';

@Injectable({
  providedIn: 'root',
})
export class AdminCarService {
  constructor(private http: HttpClient) {}
  getAllCar(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/car/viewCars`
    );
  }

  addcar(formDate: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/car`,
      formDate
    );
  }

  deleteCarById(deleteId: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/car/delete/${deleteId}`
    );
  }

  editCar(editCar: Car) {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/car/updateCar`,
      editCar
    );
  }

  filterAdminCars(filter:any){
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/car/adminCarFilter`,
      filter
    );
  }
}
