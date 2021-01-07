import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PasswordValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const parent = control.parent;
    let valid = false;

    if (parent) {

      const firstName = parent.get('firstName').value;
      const lastName = parent.get('lastName').value;

      const passwordRegex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z]).{8,}$/, 'g');
      const passwordNameRegex = new RegExp(firstName + '|' + lastName, 'gi');

      if (passwordRegex.test(control.value)) {
        valid = true;
      }

      if (passwordNameRegex.test(control.value)) {
        valid = false;
      }

      return !valid ? { 'password': 'Invalid' } : null;
    }
  };
}
