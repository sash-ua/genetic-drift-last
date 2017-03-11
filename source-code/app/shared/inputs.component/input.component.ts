import {Component, Input} from "@angular/core";
import {InputValidatorService} from "../../services/app.services/inut.validator.service";
import {MaterialColor} from "../../types/types";

@Component({
    selector: 'app-input',
    template:
        `<md-input 
            [value]="preDefData[0]" 
            [hintLabel]="preDefData[1]" 
            [dividerColor]="preDefData[2]" 
            (input)="id.value = validation.inputValidator(id.value, preDefData[3])" 
            #id 
            class="my-input"></md-input>`,
    styles:['.my-input { margin: 20px 10px}'],
    providers:[
        InputValidatorService
    ]
})
 export  class  InputComponent{
    constructor(private validation: InputValidatorService){}
    @Input('app-input-data') preDefData: string;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.