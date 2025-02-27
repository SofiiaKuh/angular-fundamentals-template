import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  public user = {
    email: '',
    password: ''
  };

  public submitted = false;

  public onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.user);
    }
  }
}
