import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  forgotPasswordForm: any;
  constructor(public formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      u_email: ['', Validators.email],
    });
  }

  submitForm(val: any){}
}
