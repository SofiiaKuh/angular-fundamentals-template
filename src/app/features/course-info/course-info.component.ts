import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CoursesFacade } from 'src/app/store/courses/courses.facade';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
    @Input() id!: string;
    course$!: Observable<Course | null>;


    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private coursesFacade: CoursesFacade
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.loadCourseData(this.id);
    }

    loadCourseData(courseId: string): void {
        this.coursesFacade.getSingleCourse(courseId);
        this.course$ = this.coursesFacade.course$;
    }

    goBack(): void {
        this.location.back();
    }
}
