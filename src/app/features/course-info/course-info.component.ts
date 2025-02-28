import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
    @Input() id!: string;
    @Input() title!: string;
    @Input() description!: string;
    @Input() creationDate!: Date;
    @Input() duration!: number;
    @Input() authors!: string[];

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private coursesService: CoursesService // Inject CoursesService
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') || '';
        this.loadCourseData(this.id);
    }

    loadCourseData(courseId: string): void {
        this.coursesService.getCourse(courseId).subscribe((course: Course) => {
            if (course) {
                this.title = course.title;
                this.description = course.description;
                this.creationDate = new Date(course.creationDate);
                this.duration = course.duration;
                this.authors = course.authors; // Adjust if using author names
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}
