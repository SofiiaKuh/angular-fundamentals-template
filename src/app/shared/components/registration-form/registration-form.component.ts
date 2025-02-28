import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';     


@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
    public registrationForm!: FormGroup;
    public submitted = false;
    constructor(
        private fb: FormBuilder,          
        private authService: AuthService,  
        private router: Router            
    ) { }

    ngOnInit(): void {
        this.registrationForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]], 
            password: ['', [Validators.required, Validators.minLength(6)]] 
        });
    }

    // Form submission logic
    public onSubmit(): void {
        this.submitted = true;
        Object.values(this.registrationForm.controls).forEach(control => {
            control.markAsTouched();
        });

        if (this.registrationForm.valid) {
            if (this.registrationForm.valid) {
                // Call register method from AuthService
                this.register();
            }
        }
    }

    register(): void {
        const { name, email, password } = this.registrationForm.value;
        this.authService.register({ name, email, password }).subscribe(
            (response) => {
                console.log('Registration successful', response);
                this.router.navigate(['/courses']);         // Navigate to courses page
            },
            (error) => {
                console.error('Registration failed', error);  // Handle error
            }
        );
    }

    get f() {
        return this.registrationForm.controls;
    }
}
