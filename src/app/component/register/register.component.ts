import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppUser } from 'src/app/model/appUser';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  user:AppUser=<AppUser>{};
  users: AppUser[] = [];
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerService.getAllUsers().subscribe({
      next: (response: any) => {
        // console.log('Response:', response.data);
        this.users = response.data;
        // console.log(this.user);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  error: String = '';
  userError: String = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit(registerForm: NgForm): void {
    let formValue = registerForm.value;
    let userExist: Boolean = false;
    console.log(formValue);

    // if (userExist == false) {
      this.registerService.register(formValue).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
          this.userError=response.error.message;
          // registerForm.resetForm();
          this.router.navigate(['/login']);
        },
        complete: () => {},
        error: (error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        
        this.userError= error.error.error.message;
        
        },
      });
    // }
  }
}
