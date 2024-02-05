// custom-validator.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorService {
  constructor() {}

  validateUsername(control: AbstractControl): ValidationErrors | null {
    const valid = /^[a-zA-Z\s]*$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  }

  validateName(control: AbstractControl): ValidationErrors | null {
    const valid = /^[a-zA-Z\s]*$/.test(control.value);
    return valid ? null : { invalidName: true };
  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    return Validators.email(control);
  }

  validatePhoneNumber(control: AbstractControl): ValidationErrors | null {
    const valid = /^[0-9]+$/.test(control.value);
    return valid ? null : { invalidPhoneNumber: true };
  }

  validateAddress(control: AbstractControl): ValidationErrors | null {
    const valid = /^\d{2}[A-Za-z\s,.'-]+$/.test(control.value);
    return valid ? null : { invalidAddress: true };
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const valid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        control.value
      );
    return valid ? null : { invalidPassword: true };
  }
}
