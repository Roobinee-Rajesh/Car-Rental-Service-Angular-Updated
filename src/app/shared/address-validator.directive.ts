import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CustomValidatorService } from '../service/custom-validation.service';


@Directive({
  selector: '[appAddressValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AddressValidatorDirective,
      multi: true,
    },
  ],
})
export class AddressValidatorDirective implements Validator {

  constructor(private customValidator: CustomValidatorService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.validateAddress(control);
  }

}
