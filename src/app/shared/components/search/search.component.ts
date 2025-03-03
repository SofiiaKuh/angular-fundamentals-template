import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesFacade } from 'src/app/store/courses/courses.facade';
import { Course } from 'src/app/models/course.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    @Input() placeholder: string = 'Search...';
    @Output() searchResults = new EventEmitter<Course[]>();

    searchText: string = '';

    constructor(private coursesFacade: CoursesFacade) { }

    onSearch(): void {
        this.coursesFacade.getFilteredCourses(this.searchText);
    }
}
