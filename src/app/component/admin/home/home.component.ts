import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { Reservation } from 'src/app/model/reservation';
import { Staff } from 'src/app/model/staff';
import { AdminCarService } from 'src/app/service/admin/admin-car.service';
import { AdminReservationService } from 'src/app/service/admin/admin-reservation.service';
import { AdminStaffService } from 'src/app/service/admin/admin-staff.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  
  staff: Staff[] = [];
  cars: Car[] = [];
  reservation: Reservation[] = [];
  chartOptions ={}
  constructor(
    private adminCarService: AdminCarService,
    private adminStaffService: AdminStaffService,
    private adminReservationService: AdminReservationService
  ) {}

  ngOnInit(): void {
    
    this.adminCarService.getAllCar().subscribe({
      next: (response: AppResponse) => {
        this.cars = response.data;
        console.log(this.cars);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.adminStaffService.getAllStaff().subscribe({
      next: (response: AppResponse) => {
        this.staff = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.adminReservationService.getAllReservation().subscribe({
      next: (response: AppResponse) => {
        this.reservation = response.data;
        console.log(this.reservation);
      },
      complete: () => {
        this.createChart();
      },
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  //Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get paginatedReservations(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reservation.slice(startIndex, endIndex);
  }

  changePage(offset: number): void {
    this.currentPage += offset;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.getTotalPages()) {
      this.currentPage = this.getTotalPages();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.reservation.length / this.itemsPerPage);
  }


  createChart() {
   
    this.chartOptions= {
      animationEnabled: true,
      backgroundColor: "transparent",
      title:{
      text: "Car Availability"
      },
      data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: this.cars.length, name: "Total Cars" ,color: "#65a30d"},
        { y: this.reservation.length, name: "Available Cars",color: "#d62a13" },
      ],
      }]
    }	
  }
  
}

