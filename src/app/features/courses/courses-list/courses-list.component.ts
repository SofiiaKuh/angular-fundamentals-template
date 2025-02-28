import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CourseListComponent {
    @Input() courses: Course[] = [];
    @Input() editable = false;

    isAdmin: boolean = false;

    constructor(
        private coursesService: CoursesService,
        private userService: UserStoreService,
        private router: Router // Inject Router
    ) { }

    ngOnInit(): void {
        this.loadCourses();
        this.userService.isAdmin$.subscribe((isAdmin) => {
            this.isAdmin = isAdmin;
        });
    }

    loadCourses(): void {
        this.coursesService.getAll().subscribe((courses: Course[]) => {
            this.courses = courses;
        });
    }

    onShowCourse(id: string): void {
        this.router.navigate([`/courses/${id}`]); // Navigate to course details page
    }

    onEditCourse(id: string): void {
        this.router.navigate([`/courses/edit/${id}`]); // Navigate to edit course page
    }

    onDeleteCourse(id: string): void {
        this.coursesService.deleteCourse(id).subscribe(() => {
            this.loadCourses(); // Refresh course list after deletion
        });
    }
}
