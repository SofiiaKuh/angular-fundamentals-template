import { Action, ActionReducerMap } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from '@app/store/courses/courses.actions';


export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: any[];
    course: any | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        errorMessage: null,
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error,
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
