import { Injectable } from '@angular/core';

@Injectable()
export class InputValidatorService {
    // Input string validation. First stage, second's in app.service.applInputsData
    inputValidator(val: string, cond: Range): any{
        const v: number = +val;
        if(v >= 0 && !cond[1]){
            return val;
        }else if(v >= 0 && cond[1] && v <= cond[1]){
            return val;
        } else {
            return 0;
        }
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.