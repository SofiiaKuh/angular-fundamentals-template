import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() message!: string;
    @Input() title!: string;
    @Input() okButtonText!: string;
    @Input() cancelButtonText!: string;

    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
