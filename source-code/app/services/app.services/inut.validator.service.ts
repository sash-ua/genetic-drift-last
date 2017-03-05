import { Injectable } from '@angular/core';

@Injectable()
export class InputValidatorService {
    constructor() { }

    // Input string validation.
    inputValidator(ev: Event, val: string, cond: Range): string{
        const v: number = +val;
        if(v >= cond[0] && !cond[1]){
            return val;
        }else if(v >= cond[0] && cond[1] && v <= cond[1]){
            return val;
        } else {
            return cond[0];
        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.