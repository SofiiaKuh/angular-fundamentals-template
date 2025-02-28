import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

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

    constructor(
        private authService: AuthService,  // Inject AuthService
        private router: Router             // Inject Router
    ) { }


    public submitted = false;

    // Form submission logic
    public onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.valid) {
            this.login();
            this.loginForm.reset();
            this.submitted = false;
        }
    }

    login(): void {
        this.authService.login(this.user).subscribe(
            (response) => {
                this.router.navigate(['/courses']); // Redirect to the courses page
            },
            (error) => {
                console.error('Login failed', error); // Handle error if login fails
            }
        );
    }
}
