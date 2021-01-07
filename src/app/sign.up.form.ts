import { Component, OnInit } from '@angular/core';
import { PasswordValidator } from './validators/password.validator';
import { SignUpService } from './services/sign.up.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './sign.up.form.html',
  styleUrls: ['./sign.up.form.scss']
})
export class SignUpFormComponent implements OnInit {
  currentWindowWidth: number;
  innerColumns: number;
  outerColumns: number;
  signUpForm: FormGroup;
  width: number;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
  ) { }

  validate(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.validate(this.signUpForm);

    if (this.signUpForm.invalid) {
      return;
    } else {
      this.signUpService.post([this.signUpForm.value].map(({ password, ...rest }) => rest)[0])
        .subscribe(resp => {
          console.log('Sign Up Form entry data POST succesful');
        });
    }
  }

  onResize(event) {
    this.currentWindowWidth = window.innerWidth;
    this.innerColumns = (event.target.innerWidth <= 400) ? 1 : 2;
    this.outerColumns = (event.target.innerWidth <= 900) ? 6 : 10;
    this.width = (event.target.innerWidth <= 900) ? 350 : 750;
  }

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
    this.innerColumns = (window.innerWidth <= 400) ? 1 : 2;
    this.outerColumns = (window.innerWidth <= 900) ? 6 : 10;
    this.width = (window.innerWidth <= 900) ? 350 : 750;
    this.signUpForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        PasswordValidator(),
        Validators.required
      ])
    });
  }
}
