import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesFacade } from 'src/app/store/courses/courses.facade';
import { Course } from 'src/app/models/course.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    courseForm!: FormGroup;
    courseId: string | null = null;
    course$: Observable<Course | null> = this.coursesFacade.course$;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private coursesFacade: CoursesFacade
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.courseId = this.route.snapshot.paramMap.get('id');

        if (this.courseId) {
            this.coursesFacade.getSingleCourse(this.courseId);
            this.course$.subscribe((course) => {
                if (course) {
                    this.populateForm(course);
                }
            });
        }
    }

    private initializeForm() {
        this.courseForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.required, Validators.minLength(2)]],
            author: ['', [Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.minLength(2)]],
            authors: this.fb.array([]),
            duration: [0, [Validators.required, Validators.min(1)]],
        });
    }

    private populateForm(course: Course) {
        this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            duration: course.duration,
        });

        this.authors.clear();
        course.authors.forEach(author => this.authors.push(this.fb.control(author)));
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
            const courseData: Course = this.courseForm.value;
            if (this.courseId) {
                this.coursesFacade.editCourse(courseData, this.courseId);
            } else {
                this.coursesFacade.createCourse(courseData);
            }
            this.router.navigate(['/courses']);
        }
    }
}
