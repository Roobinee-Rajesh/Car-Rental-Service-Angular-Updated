import { AnimateChildOptions } from '@angular/animations';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { StorageService } from 'src/app/service/storage.service';
import { UserBookingConfirmService } from 'src/app/service/user/user-confirm-booking.service';
import { UserFindCarService } from 'src/app/service/user/user-find-car.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css'],
})
export class CarViewComponent implements OnInit {
  carId: number = 0;
  car: Car = {
    id: 0,
    manufacturer: '',
    model: '',
    year: 0,
    seats: 0,
    photo: '',
    rental_pricing: 0,
    maintenance_staff: '',
    maintenance_schedule: 0,
    maintenance_staff_id: 0,
  };

  pickUpDate: string = '';
  dropDate: string = '';
  numberOfRentalDays: number = 0;
  isBookingSuccessful: boolean = false;
  confirmation: AnimationOptions = {
    path: '/assets/confirmation.json',
  };

  startDate: any = '';
  endDate: any = '';

  constructor(
    private route: ActivatedRoute,
    private userFindCarService: UserFindCarService,
    private storageService: StorageService,
    private userBookingConfirmService: UserBookingConfirmService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.carId = parseInt(params.get('carId')!);
      const fromToRange = JSON.parse(this.storageService.getFromToDate()!);
      this.pickUpDate = fromToRange.start_date;
      this.dropDate = fromToRange.end_date;
      this.userFindCarService.findCarById(this.carId).subscribe({
        next: (response: AppResponse) => {
          this.car.id = response.data.id;
          this.car.manufacturer = response.data.manufacturer;
          this.car.model = response.data.model;
          this.car.year = response.data.year;
          this.car.seats = response.data.seats;
          this.car.rental_pricing = response.data.rental_pricing;
          this.car.seats = response.data.seats;
          this.car.seats = response.data.seats;
          console.log('Response:', response.data);
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });

      const startDate = new Date(fromToRange.start_date);
      const endDate = new Date(fromToRange.end_date);

      const timeDifference = endDate.getTime() - startDate.getTime();

      this.numberOfRentalDays = Math.ceil(
        timeDifference / (1000 * 60 * 60 * 24)
      );

      this.startDate = startDate.toISOString().split('T')[0];
      this.endDate = endDate.toISOString().split('T')[0];
    });
  }

  confirmBooking() {
    this.userBookingConfirmService.reserveCar(this.carId).subscribe({
      next: (response: AppResponse) => {
        console.log('Response:', response.data);
        this.isBookingSuccessful = true;

        // Automatically hide the Lottie animation after 5 seconds
        setTimeout(() => {
          this.isBookingSuccessful = false;
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        }, 5000);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    

    //mail trigger
    this.userBookingConfirmService.sendEmail().subscribe({
      next: (response: AppResponse) => {
        console.log(response);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  currentDate: Date = new Date();

  isExpirationInvalid(expiration: string): boolean {
    // Convert the entered expiration date to a Date object
    const enteredExpiration = new Date(
      parseInt(expiration.slice(3, 7)),
      parseInt(expiration.slice(0, 2)) - 1,
      1
    );

    // Compare with the current date
    return enteredExpiration <= this.currentDate;
  }
}

