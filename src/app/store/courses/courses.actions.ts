import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';

export const requestAllCourses = createAction(CoursesConstants.REQUEST_ALL_COURSES);
export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<{ courses: any[] }>()
);
export const requestAllCoursesFail = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_FAIL,
    props<{ error: string }>()
);


export const requestSingleCourse = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE,
    props<{ id: string }>()
);
export const requestSingleCourseSuccess = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
    props<{ course: any }>()
);
export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<{ error: string }>()
);


export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{ title: string }>()
);
export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<{ courses: any[] }>()
);
export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<{ error: string }>()
);


export const requestDeleteCourse = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE,
    props<{ id: string }>()
);
export const requestDeleteCourseSuccess = createAction(CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS);
export const requestDeleteCourseFail = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
    props<{ error: string }>()
);


export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<{ id: string; course: any }>()
);
export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<{ course: any }>()
);
export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<{ error: string }>()
);


export const requestCreateCourse = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE,
    props<{ course: any }>()
);
export const requestCreateCourseSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
    props<{ course: any }>()
);
export const requestCreateCourseFail = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
    props<{ error: string }>()
);
