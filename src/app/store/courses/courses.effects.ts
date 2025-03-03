import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../services/courses.service';
import { CoursesFacade } from './courses.facade';
import * as CoursesActions from './courses.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesFacade: CoursesFacade,
        private router: Router
    ) { }

    // 1. Fetch all courses
    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map((courses) => CoursesActions.requestAllCoursesSuccess({ courses })),
                    catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
                )
            )
        )
    );

    // 2. Filter courses based on search value
    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesFacade.allCourses$),
            map(([action, courses]) => {
                const filteredCourses = courses.filter((course) =>
                    course.title.toLowerCase().includes(action.title.toLowerCase())
                );
                return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
            })
        )
    );

    // 3. Fetch a specific course
    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap((action) =>
                this.coursesService.getCourse(action.id).pipe(
                    map((course) => CoursesActions.requestSingleCourseSuccess({ course })),
                    catchError((error) => of(CoursesActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    // 4. Delete a course
    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap((action) =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => CoursesActions.requestAllCourses()), // Refresh courses list
                    catchError((error) => of(CoursesActions.requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    // 5. Edit a course
    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap((action) =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(() => CoursesActions.requestEditCourseSuccess(action.course)),
                    catchError((error) => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    // 6. Create a new course
    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap((action) =>
                this.coursesService.createCourse(action.course).pipe(
                    map(() => CoursesActions.requestCreateCourseSuccess(action.course)),
                    catchError((error) => of(CoursesActions.requestCreateCourseFail({ error })))
                )
            )
        )
    );

    // 7. Redirect to courses page after success
    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                map(() => this.router.navigate(['/courses']))
            ),
        { dispatch: false }
    );
}
