import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * A custom validator function to check if a control's value matches another control's value.
 * @param matchingControl - The control to match against.
 * @returns A ValidatorFn for the control being validated. It contains valueMismatch : true if the values do not match.
 */
export function matchValueValidator(
  matchingControl: AbstractControl,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Compare the values of the current control and the matching control
    const isMatch = control.value === matchingControl.value;
    return isMatch ? null : { valueMismatch: true };
  };
}
