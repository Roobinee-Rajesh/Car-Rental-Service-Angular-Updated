import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { CanDeactivateGuard } from 'src/app/guard/can-deactivate.guard';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Register } from 'src/app/model/register';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/model/reservation';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserReservationService } from 'src/app/service/user/user-reservation.service';
import { PdfGeneratorService } from 'src/app/service/pdf-generator-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit,CanDeactivateGuard{
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };

  error: String = '';
  id: number = 0;
  userName: String = '';
  name: String = '';
  email: string = '';
  phoneNumber: string = '';
  password: String = '';
  address: string = '';
  pastReservations: Reservation[] = [];

  // Boolean variable to track edit mode
  isEditMode: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private userReservationService: UserReservationService,
    private pdfGeneratorService:PdfGeneratorService
  ) {}

  canDeactivate(): Observable<boolean> | boolean {
    if (this.isEditMode) {
      // Display confirmation alert
      return window.confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  currentPage: number = 1;
  itemsPerPage: number = 5;

  get paginatedReservations(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pastReservations.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    // Fetch data from local storage
    let loggedInUser: AppUser = this.storageService.getLoggedInUser();
    console.log(loggedInUser);

    // Check if data exists before assigning
    if (loggedInUser) {
      this.id = loggedInUser.id;
      this.userName = loggedInUser.username;
      this.name = loggedInUser.name;
      this.email = loggedInUser.email;
      this.phoneNumber = loggedInUser.phone_number;
      this.address = loggedInUser.address;
      this.password = loggedInUser.password;
    }

    this.userReservationService.getAllPastReservation().subscribe({
      next: (response: any) => {
        this.pastReservations = response.data;
        console.log(this.pastReservations);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  // Function to toggle edit mode
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit(profileForm: NgForm): void {
    console.log(profileForm.value);

    this.authService.editUser(profileForm.value).subscribe({
      next: (response: AppResponse) => {
        console.log('Response:', response);
        this.id = response.data.id;
        this.userName = response.data.username;
        this.name = response.data.name;
        this.email = response.data.email;
        this.phoneNumber = response.data.phone_number;
        this.address = response.data.address;
        this.password = response.data.password;
        this.storageService.setLoggedInUser(response.data);
        this.isEditMode = false;
        this.ngOnInit();
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  //Pagination
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
    return Math.ceil(this.pastReservations.length / this.itemsPerPage);
  }
//Recipt download
  downloadPdf(): void {
    console.log("dowll");
    this.pdfGeneratorService.downloadPdf('receiptArea', 'Receipt');
  }

}
