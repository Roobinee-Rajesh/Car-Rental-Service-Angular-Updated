import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { HomeComponent } from './component/user/home/home.component';
import { authGuard } from './guard/auth.guard';
import { StaffHomeComponent } from './component/staff/home/home.component';
import { CarViewComponent } from './component/user/car-view/car-view.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { ViewReservationsComponent } from './component/user/view-reservations/view-reservations.component';
import { ViewCarsComponent } from './component/admin/view-cars/view-cars.component';
import { ViewStaffComponent } from './component/admin/view-staff/view-staff.component';
import { ViewMaintenanceComponent } from './component/admin/view-maintenance/view-maintenance.component';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent},
  { path: 'user/car_view/:carId', component: CarViewComponent, canActivate: [authGuard] },
  // { path: 'user/profile', component: ProfileComponent, canActivate: [authGuard]  },
  { path: 'user/profile', component: ProfileComponent, canDeactivate: [CanDeactivateGuard]},

  { path: 'user/reservations', component: ViewReservationsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  { path: 'admin/cars', component: ViewCarsComponent, canActivate: [authGuard] },
  { path: 'admin/staff', component: ViewStaffComponent, canActivate: [authGuard] },
  { path: 'admin/maintenance', component: ViewMaintenanceComponent, canActivate: [authGuard] },
  { path: 'staff', component: StaffHomeComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
