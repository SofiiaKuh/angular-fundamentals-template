import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    courseForm!: FormGroup;
    courseId: string | null = null; // Store the course ID (for edit mode)

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private coursesService: CoursesService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        // Check if there's an 'id' in the route for edit mode
        this.courseId = this.route.snapshot.paramMap.get('id');
        if (this.courseId) {
            this.loadCourse();
        }
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

    // Load course data if editing
    private loadCourse() {
        this.coursesService.getCourse(this.courseId!).subscribe((course: Course) => {
            this.courseForm.patchValue({
                title: course.title,
                description: course.description,
                duration: course.duration,
            });

            // Populate authors array
            this.authors.clear();
            course.authors.forEach(author => {
                this.authors.push(this.fb.control(author));
            });
        });
    }

    onSubmit() {
        if (this.courseForm.valid) {
            const courseData: Course = this.courseForm.value;

            if (this.courseId) {
                // Update existing course
                this.coursesService.editCourse(this.courseId, courseData).subscribe(() => {
                    this.router.navigate(['/courses']); // Redirect after update
                });
            } else {
                // Add new course
                this.coursesService.createCourse(courseData).subscribe(() => {
                    this.router.navigate(['/courses']); // Redirect after creation
                });
            }
        }
    }
}
