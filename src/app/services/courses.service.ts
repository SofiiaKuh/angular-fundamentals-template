import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private apiUrl = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    // Get all courses
    getAll(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/courses/all`);
    }

    // Create a new course
    createCourse(course: any): Observable<any> { // Replace 'any' with the required interface
        return this.http.post<any>(`${this.apiUrl}/courses/add`, course);
    }

    // Edit an existing course
    editCourse(id: string, course: any): Observable<any> { // Replace 'any' with the required interface
        return this.http.put<any>(`${this.apiUrl}/courses/${id}`, course);
    }

    // Get details of a specific course by ID
    getCourse(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/courses/${id}`);
    }

    // Delete a course by ID
    deleteCourse(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
    }

    filterCourses(duration: string[], creationDate: string[], description: string[], title: string[]): Observable<any> {
        let params = new HttpParams();

        duration.forEach(value => { params = params.append('duration', value); });
        creationDate.forEach(value => { params = params.append('creationDate', value); });
        description.forEach(value => { params = params.append('description', value); });
        title.forEach(value => { params = params.append('title', value); });
        return this.http.get<any>(`${this.apiUrl}/courses/filter`, { params }).pipe(
            map((response: any) => response || []) // Ensure it always returns an array
        );
    }


    // Get all authors
    getAllAuthors(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/authors/all`);
    }

    // Create a new author
    createAuthor(name: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/authors/add`, { name });
    }

    // Get details of a specific author by ID
    getAuthorById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/authors/${id}`);
    }
}
