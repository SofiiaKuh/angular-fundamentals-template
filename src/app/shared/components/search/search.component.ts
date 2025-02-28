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

    constructor(private coursesService: CoursesService) { }

    onSearch(): void {
        if (!this.searchText.trim()) {
            this.coursesService.getAll().subscribe({
                next: (courses) => this.searchResults.emit(courses),
                error: (err) => console.error('Error fetching courses:', err)
            });
        } else {
            this.coursesService.filterCourses(this.searchText).subscribe({
                next: (filteredCourses) => this.searchResults.emit(filteredCourses),
                error: (err) => console.error('Search failed:', err)
            });
        }
    }

}
