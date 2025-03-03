import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';

@Injectable({
    providedIn: 'root',
})
export class CoursesFacade {
    constructor(private store: Store) { }

    // Public observable properties for selecting data from store
    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
    isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
    courses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
    allCourses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
    course$: Observable<Course | null> = this.store.pipe(select(CoursesSelectors.getCourse));
    errorMessage$: Observable<string | null> = this.store.pipe(select(CoursesSelectors.getErrorMessage));

    // Dispatch actions to manipulate store
    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id: id }));
    }

    getFilteredCourses(title: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ title }));
    }

    editCourse(body: Course, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
    }

    createCourse(body: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id: id }));
    }
}
