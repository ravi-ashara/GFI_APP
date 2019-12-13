import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('checkstaySingIng', { static: false }) checkstaySingIng;
  public loginForm: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewWillEnter() {
    if (localStorage.isRemember === 'true') {
      const userDetails = JSON.parse(localStorage.getItem('loginDetails'));
      this.loginForm.patchValue(userDetails);
      this.checkstaySingIng.nativeElement.checked = true;
    }
  }

  submitForm(val: any) {
    if (this.checkstaySingIng.nativeElement.checked === true) {
      localStorage.isRemember = 'true';
    } else {
      localStorage.isRemember = 'false';
    }
    localStorage.loginDetails = JSON.stringify(val.value);
  }
}
