import { PasswordValidator } from './password.validator';
import {
  FormGroup,
  FormControl
} from '@angular/forms';

describe('PasswordValidator', () => {
  const passwordValidator = PasswordValidator();
  const formGroup = new FormGroup({
    firstName: new FormControl('Test'),
    lastName: new FormControl('User'),
    password: new FormControl('', [PasswordValidator()])
  });

  it('should fail if the input contains less than 8 characters', () => {
    formGroup.get('password').setValue('Welcome');
    const errors = formGroup.get('password').errors;
    expect(errors).toEqual({ 'password': 'Invalid' });
  });

  it('should fail if the input does not contain at least 1 uppercase character', () => {
    formGroup.get('password').setValue('welcome123');
    const errors = formGroup.get('password').errors;
    expect(errors).toEqual({ 'password': 'Invalid' });
  });

  it('should fail if the input does not contain at least 1 lowercase character', () => {
    formGroup.get('password').setValue('WELCOME123');
    const errors = formGroup.get('password').errors;
    expect(errors).toEqual({ 'password': 'Invalid' });
  });

  it('should fail if the password contains the firstname', () => {
    formGroup.get('password').setValue('TestTest');
    const errors = formGroup.get('password').errors;
    expect(errors).toEqual({ 'password': 'Invalid' });
  });

  it('should fail if the password contains the lastname', () => {
    formGroup.get('password').setValue('UserUser');
    const errors = formGroup.get('password').errors;
    expect(errors).toEqual({ 'password': 'Invalid' });
  });

  it('should pass with null errors if the password is valid', () => {
    formGroup.get('password').setValue('Welcome123');
    const errors = formGroup.get('password').errors;
    expect(errors).toBeNull();
  });
});
