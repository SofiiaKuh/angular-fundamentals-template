import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Input() placeholder: string = 'Search...';

    @Output() searchResults = new EventEmitter<Course[]>(); // Emit filtered courses

    searchText: string = '';

    duration: string[] = [];
    creationDate = [];
    description = [];
    title = [];

    constructor(private coursesService: CoursesService) { }

    onSearch(): void {
        if (
            this.duration.length === 0 &&
            this.creationDate.length === 0 &&
            this.description.length === 0 &&
            this.title.length === 0
    ) {
            this.coursesService.getAll().subscribe({
                next: (courses) => this.searchResults.emit(courses),
                error: (err) => console.error('Error fetching courses:', err)
            });
        } else {
            this.coursesService.filterCourses(this.duration, this.creationDate, this.description, this.title).subscribe({
                next: (filteredCourses) => this.searchResults.emit(filteredCourses),
                error: (err) => console.error('Search failed:', err)
            });
        }
    }

}
