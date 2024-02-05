import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validation.service';


@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  constructor(private customValidator: CustomValidatorService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.validatePassword(control);
  }
}

