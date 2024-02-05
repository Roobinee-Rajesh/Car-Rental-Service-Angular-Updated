import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from './service/notification.service';
import { AppResponse } from './model/appResponse';
import { Notification } from './model/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  noNotification: AnimationOptions = {
    path: '/assets/noNotification.json',
  };

  isAdmin: boolean = false;
  isStaff: boolean = false;
  isLoggedIn: boolean = false;
  notification:Notification[]=[];
  isNotificationViewed:boolean=false;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private notificationService:NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.authService.isStaff$.subscribe((isStaff) => {
      this.isStaff = isStaff;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if(this.isLoggedIn && !this.isStaff && !this.isAdmin){

   this.notificationService.getNotification().subscribe({
      next: (response: AppResponse) => {
   this.notification=response.data;
   console.log(response.data);
   
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  }

  logout(): void {
    this.authService.logout();
  }

  currentRouteIsHome(): boolean {
    return this.router.url === '/';
  }

  getLogoRouterLink() {
    if (this.isLoggedIn && this.isAdmin) {
      this.router.navigate(['/admin']);
      // return '/admin';
    } else if (this.isLoggedIn && this.isStaff) {
      this.router.navigate(['/staff']);
    } else if (this.isLoggedIn && !this.isAdmin && !this.isStaff) {
      this.router.navigate(['/']);
    } 
  }

  updateViewedStatus(){
    this.isNotificationViewed=true;
    this.notificationService.updateViewedStatus().subscribe({
      next: (response: AppResponse) => {

   
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

  }
}
