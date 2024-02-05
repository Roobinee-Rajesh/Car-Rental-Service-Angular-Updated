import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Maintenance } from 'src/app/model/maintenance';
import { Reservation } from 'src/app/model/reservation';
import { StaffMaintenanceService } from 'src/app/service/staff/staff-maintenance-service.service';
import { StaffReservationService } from 'src/app/service/staff/staff-reservation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class StaffHomeComponent implements OnInit {
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };
  maintenance: Maintenance[] = [];
  reservation:Reservation[]=[];
  maintenanceStatusList: { label: string; value: string }[] = [];

  constructor(
    private staffMaintenanceService: StaffMaintenanceService,
    private staffReservationService: StaffReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maintenanceStatusList = [
      { label: 'Pending', value: '1' },
      { label: 'Maintenance Done', value: '2' },
    ];
    this.staffMaintenanceService.getAllStaffMaintenance().subscribe({
      next: (response: any) => {
        this.maintenance = response.data;
        this.maintenance.forEach((item) => (item.maintenanceStatus = '1'));
        console.log(this.maintenance);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.staffMaintenanceService.getAllStaffReservation().subscribe({
      next: (response: any) => {
        this.reservation = response.data;
        console.log(this.reservation);
        
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },

    })
  }

  onStatusChange(maintenanceItem: Maintenance) {
    this.staffMaintenanceService.updateMaintenance(maintenanceItem).subscribe({
      next: (response: AppResponse) => {
        console.log('Response:', response);
        // this.maintenance=response.data;
        // this.ngOnInit();
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  cancelReservation(reservation:Reservation){
    console.log(reservation);
    
    this.staffReservationService.cancelReservationById(reservation).subscribe({
      next: (response: any) => {
        console.log(response.data);
       this.reservation=response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  currentPage: number = 1;
  itemsPerPage: number = 4;

  currentPageReservation: number = 1;
  itemsPerPageReservation: number = 4;

  //Pagination
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.maintenance.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
 
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }

  getPageNumbersReservation(): number[] {
    const pageCount = Math.ceil(this.reservation.length / this.itemsPerPageReservation);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
 
  getLastPageReservation(): number {
    return this.getPageNumbersReservation().slice(-1)[0] || 1;
  }

}
