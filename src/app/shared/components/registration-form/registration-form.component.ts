import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
    public registrationForm!: FormGroup;
    public submitted = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.registrationForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]], // Custom validator will be applied in template
            password: ['', Validators.required]
        });
    }

    public onSubmit(): void {
        this.submitted = true;
        if (this.registrationForm.valid) {
            console.log('Form Submitted', this.registrationForm.value);
        }
    }

    get f() {
        return this.registrationForm.controls;
    }
}
