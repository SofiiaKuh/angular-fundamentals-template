import { Component } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {

  courseForm!: FormGroup;
    constructor(public fb: FormBuilder, public library: FaIconLibrary) {
        library.addIconPacks(fas);
        this.initializeForm();
    }

    private initializeForm() {
        this.courseForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.required, Validators.minLength(2)]],
            author: ['', [Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.minLength(2)]],
            authors: this.fb.array([]),
            duration: [0, [Validators.required, Validators.min(0)]],
        });
    }

    get f() {
        return this.courseForm.controls;
    }

    get authors() {
        return this.courseForm.get('authors') as FormArray;
    }

    addAuthor() {
        if (this.f['author'].valid && this.f['author'].value) {
            this.authors.push(this.fb.control(this.f['author'].value));
            this.f['author'].reset();
        }
    }

    removeAuthor(index: number) {
        this.authors.removeAt(index);
    }

    onSubmit() {
        if (this.courseForm.valid) {
            console.log('Course Data:', this.courseForm.value);
        }
    }
}
