import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validation.service';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  constructor(private customValidator: CustomValidatorService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.validateEmail(control);
  }
}
