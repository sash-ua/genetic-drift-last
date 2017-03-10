import { Injectable } from '@angular/core';
import {Inputs, Range} from "../../types/types";

@Injectable()
export class AppService {
    constructor() { }
    // Return random number from min to max (ex. max).
    rndmGen(min: number, max: number): number{
        return Math.floor(Math.random()* (max - min) + min);
    }

    // Fn used to collect inputted by user data into array.
    // For first three el-s of HTMLCollection by tag return inager, for others - float.
    collectionDataInputs(tag: string): Range{
        return [].slice.call(document.querySelectorAll(tag)).map((v: any, i: number, arr: HTMLAllCollection) => {
            return (i === 0 || i === 1 || i === 2) ? parseInt(this.isExist(v.value), 10) : parseFloat(this.isExist(v.value));
        });
    }

    // Return 0 if given value is undef. or null or function return value if it exist.
    isExist(val: any){
        return val ? val : 0;
    }

    // Collectioned users data transformed to Inputs type.
    applInputsData(inputs: Inputs, arr: Range): Inputs {
        inputs.forEach((v, i, a) => {
            v.preDefData = arr[i];
        });
        return inputs;
    }
    // width factor(wf), height factor(hf). If window width(ww) > window height(wh) return wf*ww else hf*wh
    svgWidth(wf: number, hf: number): number{
        const WW = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        const WH = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        return (WW >= WH) ? (wf*WW) : (hf*WH);
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.