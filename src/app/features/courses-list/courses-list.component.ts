import { Component, Input, Output, EventEmitter } from '@angular/core';

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
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
    @Input() courses: Course[] = [];
    @Input() editable = false;

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
        thi
