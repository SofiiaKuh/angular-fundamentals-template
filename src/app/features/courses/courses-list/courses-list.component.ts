import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesFacade } from 'src/app/store/courses/courses.facade';
import { Course } from 'src/app/models/course.model';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-course-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CourseListComponent {
    courses$: Observable<Course[]>;
    @Input() editable = false;

    isAdmin: boolean = false;

    constructor(
        private coursesFacade: CoursesFacade,
        private userService: UserStoreService,
        private router: Router // Inject Router
    ) {
        this.courses$ = this.coursesFacade.allCourses$;
    }

    ngOnInit(): void {
        this.loadCourses();
        this.userService.isAdmin$.subscribe((isAdmin) => {
            this.isAdmin = isAdmin;
        });

    }

    loadCourses(): void {
        this.coursesFacade.getAllCourses(); // Dispatch action to fetch courses
        this.userService.isAdmin$.subscribe((isAdmin) => {
            this.isAdmin = isAdmin;
        });
    }

    onShowCourse(id: string): void {
        this.router.navigate([`/courses/${id}`]); // Navigate to course details page
    }

    onEditCourse(id: string): void {
        this.router.navigate([`/courses/edit/${id}`]); // Navigate to edit course page
    }

    onDeleteCourse(id: string): void {
        this.coursesFacade.deleteCourse(id);
    }
}
