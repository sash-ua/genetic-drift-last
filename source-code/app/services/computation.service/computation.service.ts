
import { Injectable } from '@angular/core';

@Injectable()
export class ComputationService {
    constructor() { }
    // Array generator
    arrG (func: Function, ...arg: Array<any>): Function{
        return (iteration: number) => {
            return new Array(iteration[0]).fill(0).map((v, i, arr) => func(arg, v, i, arr));
        };
    };

    // Randomly generate true  / false (heads / tail).
    tossing1 (p: number): boolean{
        return (Math.random() <= p);
    };
    // Calculation of results from function 'fn'. 'fn' return true / false, what balance of results.
    bounchCoin1 ([fn, edge, p]: Array<any>): number {
        let h = 0,
            q = edge;
        while (edge--){
            if(fn(p)) {
                h++;
            }
        }
        return h/q;
    };

    effPopSize1(N: number): number{
        return 1/N;
    };

    harmonic1(generations: Array<number>): number{
        return Math.round(generations.length / generations.reduce(( acc, val ) => {
                return acc + this.effPopSize1( val );
            }, 0 ));
    };
    // BNF & MD interval[0. 1].
    NRandom ([n0, grLim, BNF, MD]: Array<number>): number {
        return Math.random() < BNF
            ? n0 + Math.floor(Math.random() * (1+ grLim - MD) - (Math.random() * (n0 * (1 - (MD*2)))))
            : n0 + Math.floor(Math.random() * (1+ grLim - MD));
    };

    NGen([fn, n0, rLim, BNF, MD]: Array<any>, ...s: Array<any>): number{
        return (s[1] === 0 ) ? n0 : fn([n0, rLim, BNF, MD]);
    };

    cmptnAlleles (fn: Function, p: number, ...s: Array<Function>): Function {
        return ([arr]: Array<any>): Array<number> => {
            let a1 = p;
            return [a1].concat(arr.map((v: number, i: number, arr: Array<number>) => {
                return a1 = fn([s[0], v, a1]);
            }))
        }
    };
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.