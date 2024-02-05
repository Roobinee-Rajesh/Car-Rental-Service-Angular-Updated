import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validation.service';

@Directive({
  selector: '[appPhoneNumberValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneNumberValidatorDirective,
      multi: true,
    },
  ],
})
export class PhoneNumberValidatorDirective implements Validator {

  constructor(private customValidator: CustomValidatorService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.validatePassword(control);
  }
}
