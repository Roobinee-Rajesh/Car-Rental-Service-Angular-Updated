import { Component } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { SearchRange } from 'src/app/model/searchRange';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserFindCarService } from 'src/app/service/user/user-find-car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarFilter } from 'src/app/model/car-filter';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showResults: boolean = false;
  searchResults: Car[] = [];
  cars: Car[] = [];
  form: FormGroup;
  defaultPickupDate: string = '';
  filter: CarFilter = {};
  labelPosition: number = 0;
  manufacturers: String[] = [];
  models: String[] = [];
  start_date: String = '';
  end_date: String = '';
  isFiltered: boolean = false;
  sliderValue = 0;
  minPrice = 0;
  maxPrice = 500;
  

  sliderOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 10,
    showTicks: true,
    tickStep: 100,
  };

  constructor(
    private userFindCarService: UserFindCarService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.filter.rentalPricing = 0;
    this.filter.rentalPricingRangeMin = 0;
    this.filter.rentalPricingRangeMax = this.maxPrice;
    this.filter.manufacturer="";
    this.form = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.defaultPickupDate = this.getCurrentDate();

    // Subscribe to changes in the pickup date control
    this.form.get('start_date')!.valueChanges.subscribe((value) => {
      // Enable or disable the drop date control based on the pickup date value
      const dropDateControl = this.form.get('end_date');
      if (value) {
        dropDateControl!.enable();
        dropDateControl!.setValidators([
          Validators.required,
          this.validateDropDate.bind(this),
        ]);
      } else {
        dropDateControl!.disable();
        dropDateControl!.clearValidators();
      }
      dropDateControl!.updateValueAndValidity();
    });
  }

  // Custom validator function for drop date
  validateDropDate(control: AbstractControl) {
    const pickupDate = new Date(this.form.get('start_date')!.value);
    const dropDate = new Date(control.value);

    if (pickupDate && dropDate && dropDate <= pickupDate) {
      return { invalidDropDate: true };
    }

    return null;
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      if (this.filter.rentalPricing == 0) this.filter.rentalPricing = undefined;
      const formValue: SearchRange = this.form.value;
      this.start_date = this.form.value.start_date;
      this.end_date = this.form.value.end_date;
      const formValueString = JSON.stringify(formValue);
      this.storageService.setFromToDate(formValueString);

      this.userFindCarService.findCars(formValue).subscribe({
        next: (response: AppResponse) => {
          this.searchResults = response.data;
          this.cars = response.data;
          console.log('Response:', response.data);
          // Unique manufacturers
          this.manufacturers = this.getUniqueManufacturers();
          console.log(this.manufacturers);

          this.showResults = true;
          // Extract prices into an array
          const prices: number[] = this.cars.map((car) => car.rental_pricing!);

          // Find the minimum and maximum prices
          this.minPrice = Math.min(...prices);
          this.maxPrice = Math.max(...prices);
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    }
  }

  // Manifacturers for dropdown
  private getUniqueManufacturers(): string[] {
    return [...new Set(this.searchResults.map((car) => car.manufacturer))];
  }

  loggedInUser(): boolean {
    return this.authService.isLoggedIn();
  }

  scroll(direction: 'left' | 'right'): void {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const scrollAmount = 300; // adjust as needed
      if (direction === 'left') {
        scrollContainer.scrollLeft -= scrollAmount;
      } else {
        scrollContainer.scrollLeft += scrollAmount;
      }
    }
  }

  // Filter
  applyFilter() {
    console.log(this.filter);
    this.userFindCarService.findCarByFilter(this.filter).subscribe({
      next: (response: AppResponse) => {
        this.searchResults = response.data;
        console.log('Response:', response.data);
        this.isFiltered = true;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  clearFilter() {
    this.searchResults = this.cars;
    this.isFiltered = false;
  }
}
