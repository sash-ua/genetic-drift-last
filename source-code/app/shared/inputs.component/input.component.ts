import {Component, Input} from "@angular/core";
import {InputValidatorService} from "../../services/inut.validator.service";

@Component({
    selector: 'app-input',
    template:
        `<md-input-container
                [dividerColor]="input.dvdrColor"
                class="my-input">
            <input mdInput
                [value]="input.preDefData"
                [placeholder]="input.hint"
                (input)="id.value = validation.inputControl(id.value, input.interval)" 
                #id>
        </md-input-container>
                `,
    styles:['.my-input { margin: 10px 10px}'],
    providers:[
        InputValidatorService
    ]
})
export  class  InputComponent {
    constructor(
        public validation: InputValidatorService,
    ){}

    @Input('app-input-data') input: object;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.