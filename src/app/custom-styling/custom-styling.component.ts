import {Component, OnInit} from '@angular/core';
import {StyleService} from '../style.service';

@Component({
    selector: 'app-custom-styling',
    templateUrl: './custom-styling.component.html',
    styleUrls: ['./custom-styling.component.scss']
})
export class CustomStylingComponent implements OnInit {
    errorMessage: string;

    constructor(private styleService: StyleService) {
    }

    ngOnInit() {
    }

    imageFinishedUploading(file) {
        this.styleService.getStyle(file.src).subscribe(response => {
            if (response.err) {
                this.errorMessage = response.err;
            }
            else {
                this.errorMessage = '';
                this.styleService.publishData(response);
            }
        });
    }
}
