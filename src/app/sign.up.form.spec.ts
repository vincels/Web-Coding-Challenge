import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { SignUpFormComponent } from './sign.up.form';

describe('SignUpForm', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be instantiated', () => {
    expect(component).toBeTruthy();
  });

  describe('the first name entry', () => {

    it('should be invalid if no data is entered', () => {
      const field = component.signUpForm.controls['firstName'];
      field.setValue('');
      const errors = field.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('should be valid if data is entered', () => {
      const field = component.signUpForm.controls['firstName'];
      field.setValue('Test');
      const errors = field.errors || {};
      expect(errors.required).toBeFalsy();
    });
  });

  describe('the last name entry', () => {

    it('should be invalid if no data is entered', () => {
      const field = component.signUpForm.controls['lastName'];
      field.setValue('');
      const errors = field.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('should be valid if data is entered', () => {
      const field = component.signUpForm.controls['lastName'];
      field.setValue('Pan');
      const errors = field.errors || {};
      expect(errors.required).toBeFalsy();
    });
  });

  describe('the email entry', () => {

    it('should be invalid if no data is entered', () => {
      const field = component.signUpForm.controls['email'];
      field.setValue('');
      const errors = field.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('should be invalid if incorrect data is entered', () => {
      const field = component.signUpForm.controls['email'];
      field.setValue('test.user@');
      const errors = field.errors || {};
      expect(errors.required).toBeFalsy();
      expect(errors.email).toBeTruthy();
    });

    it('should be valid if correct data is entered', () => {
      const field = component.signUpForm.controls['email'];
      field.setValue('test.user@example.com');
      const errors = field.errors || {};
      expect(errors.required).toBeFalsy();
      expect(errors.email).toBeFalsy();
    });
  });

  describe('the password entry', () => {

    it('should be invalid if no data is entered', () => {
      const field = component.signUpForm.controls['password'];
      field.setValue('');
      const errors = field.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('should be invalid if incorrect data is entered', () => {
      component.signUpForm.setValue({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@example.com',
        password: 'TestTest'
      });
      const field = component.signUpForm.controls['password'];
      const errors = field.errors || {};
      expect(errors.password).toBeTruthy();
    });

    it('should be valid if correct data is entered', () => {
      component.signUpForm.setValue({
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@example.com',
        password: 'Welcome123'
      });
      const field = component.signUpForm.controls['password'];
      const errors = field.errors || {};
      expect(errors.password).toBeFalsy();
    });
  });

  describe('the sign up form entry', () => {

    it('should be invalid if no data is entered', () => {
      expect(component.signUpForm.valid).toBeFalsy();
    });

    it('should be valid if data is entered', () => {
      component.signUpForm.setValue({
        email: 'test.user@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'Welcome123'
      });
      expect(component.signUpForm.valid).toBeTruthy();
    });

    it('should poperly be validated when entered', () => {
      const form = component.signUpForm;
      form.setValue({
        email: 'test.user@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'Welcome123'
      });
      spyOn(form.controls['firstName'], 'updateValueAndValidity');
      spyOn(form.controls['lastName'], 'updateValueAndValidity');
      spyOn(form.controls['email'], 'updateValueAndValidity');
      spyOn(form.controls['password'], 'updateValueAndValidity');

      component.validate(form);

      expect(form.controls['firstName'].updateValueAndValidity).toHaveBeenCalled();
      expect(form.controls['lastName'].updateValueAndValidity).toHaveBeenCalled();
      expect(form.controls['email'].updateValueAndValidity).toHaveBeenCalled();
      expect(form.controls['password'].updateValueAndValidity).toHaveBeenCalled();
    });

    it('should poperly be validated before submit', () => {
      spyOn(component, 'validate');
      component.onSubmit();
      expect(component.validate).toHaveBeenCalled();
    });
  });
});
