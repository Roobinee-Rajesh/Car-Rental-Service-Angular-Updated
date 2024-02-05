import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validation.service';

@Directive({
  selector: '[appNameValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true }]
})
export class NameValidatorDirective implements Validator {
  constructor(private customValidator: CustomValidatorService){}

  // validate(control: AbstractControl): { [key: string]: boolean } | null {
  //   const valid = /^[a-zA-Z\s]*$/.test(control.value);

  //   return valid ? null : { validName: false };
  // }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.validateUsername(control);
  }
}
