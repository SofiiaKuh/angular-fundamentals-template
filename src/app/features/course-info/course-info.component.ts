import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';


@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
    @Input() id!: string;
    @Input() title!: string;
    @Input() description!: string;
    @Input() creationDate!: Date;
    @Input() duration!: number;
    @Input() authors!: string[];
    constructor(private location: Location) { }

    goBack(): void {
        this.location.back();
    }
}
