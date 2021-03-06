
import {Component, Input} from '@angular/core';
import {MaterialModule} from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'progress-spinner-i',
    template: `<md-spinner [mode]="mode" [value]="value"></md-spinner>`,
    styleUrls: ['spinner.component.css']
})
export class SpinnerComponent {
    @Input() mode: MaterialModule = 'determinate';
    @Input('spinner-start-val') value: MaterialModule;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.