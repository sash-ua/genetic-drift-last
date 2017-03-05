
import {Component, Input} from '@angular/core';
import {MaterialModule} from "@angular/material";
import {MaterialColor} from "../../types/types";

@Component({
    moduleId: module.id,
    selector: 'progress-spinner-i',
    template: `<md-spinner [mode]="mode" [value]="value" [class.visibility]="toggle"></md-spinner>`,
    styleUrls: ['spinner.component.css']
})
export class SpinnerComponent {
    constructor() { }
    @Input() mode: MaterialModule = 'determinate';
    @Input('spinner-start-val') value: MaterialModule;
    @Input('spinner-tgl') toggle: string;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.