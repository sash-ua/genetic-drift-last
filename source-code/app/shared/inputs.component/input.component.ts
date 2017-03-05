import {Component, Input} from "@angular/core";
import {Range} from "../../core/modeling.component/modeling.component";
import {InputValidatorService} from "../../services/app.services/inut.validator.service";
import {MaterialColor} from "../../types/types";

@Component({
    selector: 'app-input',
    template:
        `<md-input [value]="preDefData" [hintLabel]="hint" class="my-input" [dividerColor]="dvdrClr"  (keyup)="id.value = validation.inputValidator($event, id.value, cond)" #id ></md-input>`,
    styles:['.my-input { margin: 20px 10px}'],
    providers:[
        InputValidatorService
    ]
})
 export  class  InputComponent{
    constructor(private validation: InputValidatorService){}
    @Input('app-input-data') preDefData: string;
    @Input('app-input-hint') hint: string;
    @Input('app-input-cond') cond: Array<number>;
    @Input('app-input-dividerColor') dvdrClr: MaterialColor = 'warn';
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.