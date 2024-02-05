import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Reservation } from 'src/app/model/reservation';
import { UserReservationService } from 'src/app/service/user/user-reservation.service';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css'],
})
export class ViewReservationsComponent implements OnInit {
  futureReservations: Reservation[] = [];
  currentReservation: Reservation[] = [];
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };

  constructor(
    private userReservationService: UserReservationService,
    private router: Router
  ) {}

  currentPageFutureReservation: number = 1;
  itemsPerPageFutureReservation: number = 4;

  currentPageCurrentReservation: number = 1;
  itemsPerPageCurrentReservation: number = 4;

  ngOnInit(): void {
    this.userReservationService.getAllFutureReservation().subscribe({
      next: (response: any) => {
        this.futureReservations = response.data;
        // this.changePage(1);
        console.log(this.futureReservations);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.userReservationService.getCurrentReservation().subscribe({
      next: (response: any) => {
        this.currentReservation = response.data;
        console.log(this.currentReservation);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  cancelReservation(reservationId: number) {
    this.userReservationService.cancelReservationById(reservationId).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.ngOnInit();
        // this.router.navigate(['/cars']);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

    //Pagination
    getPageNumbersCurrentReservation(): number[] {
      const pageCount = Math.ceil(this.currentReservation.length / this.itemsPerPageCurrentReservation);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
   
    getLastPageCurrentReservation(): number {
      return this.getPageNumbersCurrentReservation().slice(-1)[0] || 1;
    }

    getPageNumbersFutureReservation(): number[] {
      const pageCount = Math.ceil(this.futureReservations.length / this.itemsPerPageFutureReservation);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
   
    getLastPageFutureReservation(): number {
      return this.getPageNumbersFutureReservation().slice(-1)[0] || 1;
    }

}
