import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service'; // Import the CoursesService

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    // Private BehaviorSubjects to store the courses data and loading state
    private courses$$ = new BehaviorSubject<any[]>([]); // Replace 'any' with the actual Course interface
    private isLoading$$ = new BehaviorSubject<boolean>(false);

    // Public Observable properties for external consumption
    courses$ = this.courses$$.asObservable();
    isLoading$ = this.isLoading$$.asObservable();

    constructor(private coursesService: CoursesService) { }

    // Get all courses
    getAll(): void {
        this.isLoading$$.next(true);
        this.coursesService.getAll().subscribe({
            next: (courses) => {
                this.courses$$.next(courses);
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Create a new course
    createCourse(course: any): void { // Replace 'any' with the actual Course interface
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).subscribe({
            next: (newCourse) => {
                this.courses$$.next([...this.courses$$.getValue(), newCourse]);
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Edit an existing course
    editCourse(id: string, course: any): void { // Replace 'any' with the actual Course interface
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).subscribe({
            next: (updatedCourse) => {
                const updatedCourses = this.courses$$.getValue().map(c =>
                    c.id === id ? updatedCourse : c
                );
                this.courses$$.next(updatedCourses);
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Get a single course by ID
    getCourse(id: string): void {
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id).subscribe({
            next: (course) => {
                this.courses$$.next([course]); // This can be adjusted if you want to store the course separately
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Delete a course by ID
    deleteCourse(id: string): void {
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id).subscribe({
            next: () => {
                const updatedCourses = this.courses$$.getValue().filter(c => c.id !== id);
                this.courses$$.next(updatedCourses);
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Filter courses based on a search value
    filterCourses(duration: string[], creationDate: string[], description: string[], title: string[]): void {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(duration, creationDate, description, title).subscribe({
            next: (filteredCourses) => {
                this.courses$$.next(filteredCourses);
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Get all authors
    getAllAuthors(): void {
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors().subscribe({
            next: (authors) => {
                // Logic for handling authors, depending on the app's requirements
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Create a new author
    createAuthor(name: string): void {
        this.isLoading$$.next(true);
        this.coursesService.createAuthor(name).subscribe({
            next: (newAuthor) => {
                // Handle new author logic (e.g., add to list)
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }

    // Get an author by ID
    getAuthorById(id: string): void {
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id).subscribe({
            next: (author) => {
                // Handle the single author data
                this.isLoading$$.next(false);
            },
            error: () => {
                this.isLoading$$.next(false);
            }
        });
    }
}
