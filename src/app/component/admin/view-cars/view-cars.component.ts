import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminFilter } from 'src/app/model/admin-filter';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { Staff } from 'src/app/model/staff';
import { AdminCarService } from 'src/app/service/admin/admin-car.service';
import { AdminStaffService } from 'src/app/service/admin/admin-staff.service';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css'],
})
export class ViewCarsComponent implements OnInit {
  cars: Car[] = [];
  manufacturers: String[] = [];
  editId: number = 0;
  file = '';
  search: String = '';
  allCars: Car[] = [];
  filteredCars:Car[]=[];
  editCarObject = <Car>{};
  buttonName: string = 'Add';
  staffOptions: Staff[] = [];
  maintenance_staff_id: number = 0;
  seats: number[] = [5, 8];
  filter: AdminFilter=<AdminFilter>{};
  isFiltered:boolean=false;

  constructor(
    private adminCarService: AdminCarService,
    private adminStaffService: AdminStaffService,
    private router: Router
      ) {}

  ngOnInit(): void {
    this.adminCarService.getAllCar().subscribe({
      next: (response: AppResponse) => {
        this.cars = response.data;
        this.allCars = response.data;
        this.manufacturers = this.getUniqueManufacturers();
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
        this.staffOptions = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  deleteCar(deleteId: number | undefined) {
    if (deleteId != undefined) {
      console.log(deleteId);

      this.adminCarService.deleteCarById(deleteId).subscribe({
        next: (response: any) => {
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    }
  }

  editCar(car: Car) {
    console.log(car);
    this.editCarObject = car;
    this.buttonName = 'Save';
  }

  onSubmit(addCarForm: NgForm): void {
    let formValue: Car = addCarForm.value;
    if (formValue.id === undefined) {
      formValue.id = 0;
      this.editCarObject.id = 0;
    }
    console.log(formValue);
    console.log(this.editCarObject.id);
    console.log(this.file);
    
    const formData = new FormData();
    formData.append('id', formValue.id!.toString());
    formData.append('photoFile', this.file);
    formData.append('manufacturer', formValue.manufacturer);
    formData.append('model', formValue.model);
    formData.append('year', formValue.year!.toString());
    formData.append('seats', formValue.seats!.toString());
    formData.append('rental_pricing', formValue.rental_pricing!.toString());
    formData.append(
      'maintenance_schedule',
      formValue.maintenance_schedule!.toString()
    );
    formData.append(
      'maintenance_staff_id',
      formValue.maintenance_staff_id!.toString()
    );

    console.log(formValue);
    if (this.editCarObject.id === 0) {
      formValue.photoFile = this.file;
      console.log(formValue.photoFile);

      this.adminCarService.addcar(formData).subscribe({
        next: (response: AppResponse) => {
          console.log('Response:', response);
          addCarForm.resetForm();
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    } else {
      this.adminCarService.editCar(formValue).subscribe({
        next: (response: AppResponse) => {
          console.log('Response:', response);
          addCarForm.resetForm();
          this.buttonName = 'Add';
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    }
  }

  addReset() {
    this.editCarObject = <Car>{};
    this.buttonName = 'Add';
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
    // console.log(this.file);
  }

  //Pagination
  currentPage: number = 1;
  itemsPerPage: number = 4;

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.cars.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }

  //Search using car manufacturer
  filterArray() {
    if(!this.isFiltered){
    this.cars = this.allCars.filter((e: any) => {
      return (
        e.manufacturer.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
  }else{
    this.cars = this.filteredCars.filter((e: any) => {
      return (
        e.manufacturer.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
  }
  }

  onCancelDelete() {
    // this.router.navigate(['/admin/cars'],{ replaceUrl: true });
  }

  // Manifacturers for dropdown
  private getUniqueManufacturers(): string[] {
    return [...new Set(this.cars.map((car) => car.manufacturer))];
  }

  checkedListManufacturer: String[] = [];
  onChangeManufacturer(event: any, manufacturer: String) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedListManufacturer.push(manufacturer);
    } else {
      const index = this.checkedListManufacturer.indexOf(manufacturer);
      if (index !== -1) {
        this.checkedListManufacturer.splice(index, 1);
      }
    }
    console.log(this.checkedListManufacturer);
  }

  checkedListSeats: number[] = [];
  onChangeSeat(event: any, seat: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkedListSeats.push(seat);
    } else {
      const index = this.checkedListSeats.indexOf(seat);
      if (index !== -1) {
        this.checkedListSeats.splice(index, 1);
      }
    }
    console.log(this.checkedListSeats);
  }

  carFilter() {
    this.filter.manufacturer = this.checkedListManufacturer;
    this.filter.seat = this.checkedListSeats;
    this.isFiltered=true;
    
    console.log(this.filter);

    this.adminCarService.filterAdminCars(this.filter).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cars = response.data;
        this.filteredCars=response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  clearForm(){
    this.cars=this.allCars;
    this.checkedListManufacturer=[];
    this.checkedListSeats=[]
    this.isFiltered=false;
  }
}
