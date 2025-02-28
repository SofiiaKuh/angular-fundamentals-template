import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedCoursesList } from "src/app/shared/mocks/mocks";

interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
}

@Component({
    selector: 'app-course-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.css']
})
export class CourseListComponent {
    @Input() courses: Course[] = mockedCoursesList.map(course => ({
        ...course,
        creationDate: new Date(course.creationDate) 
    }));    @Input() editable = false;

    @Output() showCourse = new EventEmitter<string>();
    @Output() editCourse = new EventEmitter<string>();
    @Output() deleteCourse = new EventEmitter<string>();

    onShowCourse(id: string): void {
        this.showCourse.emit(id);
    }

    onEditCourse(id: string): void {
        this.editCourse.emit(id);
    }

    onDeleteCourse(id: string): void {
        this.deleteCourse.emit(id);
    }
}
