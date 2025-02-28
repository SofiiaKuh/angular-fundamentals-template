import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
    @Input() title!: string;
    @Input() description!: string;
    @Input() creationDate!: Date;
    @Input() duration!: number;
    @Input() authors!: string[];
    @Input() editable = false;

    @Input() isAdmin: boolean = false; 

    @Output() clickOnShow = new EventEmitter<void>();
    @Output() clickOnEdit = new EventEmitter<void>();
    @Output() clickOnDelete = new EventEmitter<void>();

    onShowCourse(): void {
        this.clickOnShow.emit();
    }

    onEditCourse(): void { 
        this.clickOnEdit.emit();
    }

    onDeleteCourse(): void {
        this.clickOnDelete.emit();
    }
}
