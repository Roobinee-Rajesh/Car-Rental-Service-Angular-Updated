import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { AppResponse } from 'src/app/model/appResponse';
import { urlEndpoint } from 'src/app/utils/constant';
import { Register } from 'src/app/model/register';
import { Staff } from 'src/app/model/staff';

@Injectable({
  providedIn: 'root',
})
export class AdminStaffService {
  constructor(private http: HttpClient) {}
  getAllStaff(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/staff/viewStaff`
    );
  }

  addStaff(formValue: Register): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/staff/registerStaff`,
      formValue
    );
  }

  deleteStaffById(deleteId: number): Observable<AppResponse> {    
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/staff/delete/${deleteId}`
    );
  }

  editStaff(staff: Staff) {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/staff/update/`,
      staff
    );
  }
}
