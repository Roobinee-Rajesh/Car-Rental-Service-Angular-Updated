import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../../model/appResponse';
import { Observable } from 'rxjs';
import { Maintenance } from 'src/app/model/maintenance';
import { StorageService } from '../storage.service';
import { urlEndpoint } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root',
})
export class StaffMaintenanceService {
  userId: number = this.storageService.getLoggedInUser().id;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  getAllStaffMaintenance(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/staff/viewMaintenance/${this.userId}`
    );
  }

  getAllStaffReservation(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/staff/reservation/staffReservation/${this.userId}`
    );
  }

  updateMaintenance(maintenanceItem: Maintenance): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/staff/updateStatus`,
      maintenanceItem
    );
  }
}
