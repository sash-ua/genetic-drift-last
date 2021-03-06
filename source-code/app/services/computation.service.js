var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var ComputationService = (function () {
    function ComputationService() {
    }
    // Array generator
    ComputationService.prototype.arrG = function (func) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        return function (iteration) {
            return new Array(iteration[0]).fill(0).map(function (v, i, arr) { return func(arg, v, i, arr); });
        };
    };
    ;
    // Return random number from min to max (ex. max).
    ComputationService.prototype.rndmGen = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    // Randomly generate true  / false (heads / tail).
    ComputationService.prototype.tossing1 = function (p) {
        return (Math.random() <= p);
    };
    ;
    // Calculation of results from function 'fn'. 'fn' return true / false,
    // bounchCoin1 returns percentage of 'true' in 'edge' cases. Result (interval[0, 1]).
    ComputationService.prototype.bounchCoin1 = function (_a) {
        var fn = _a[0], edge = _a[1], p = _a[2];
        var h = 0, q = edge;
        while (edge--) {
            if (fn(p)) {
                h++;
            }
        }
        return h / q;
    };
    ;
    ComputationService.prototype.effPopSize1 = function (N) {
        return 1 / N;
    };
    ;
    // Calculate eff. population size
    ComputationService.prototype.harmonic1 = function (generations) {
        var _this = this;
        return Math.round(generations.length / generations.reduce(function (acc, val) {
            return acc + _this.effPopSize1(val);
        }, 0));
    };
    ;
    // BNF & MD interval[0, 1].
    ComputationService.prototype.NRandom = function (_a) {
        var n0 = _a[0], growth = _a[1], BNF = _a[2], MD = _a[3];
        return Math.random() < BNF
            ? n0 + Math.floor(Math.random() * (1 + growth - MD) - (Math.random() * (n0 * (1 - (MD * 2)))))
            : n0 + Math.floor(Math.random() * (1 + growth - MD));
    };
    ;
    // Calculate next generation size.
    // Take:
    // fn- function NRandom,
    // n0 - prev. population,
    // growth - max. population growth,
    // BNF - bottle neck factor,
    // MD - max. decrease of population,
    // s - v, i, arr from arrG.
    ComputationService.prototype.NGen = function (_a) {
        var fn = _a[0], args = _a.slice(1);
        var s = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            s[_i - 1] = arguments[_i];
        }
        return (s[1] === 0) ? args[0] : fn(args.slice());
    };
    ;
    // In context of this application.
    // cmptnAlleles get (bounchCoin1, origin percentage of one of alleles(initial 0.5), tossing1)([simulations] ) =>
    // Array of arrays(quantity depends of simulations) of p (for example: percentage of allele A1 in the genotype).
    // Every next p computed randomly, exclude first.
    // Result [[0.5, 0.48,...],[0.5, 0.7,...],...]
    ComputationService.prototype.cmptnAlleles = function (fn, p) {
        var s = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            s[_i - 2] = arguments[_i];
        }
        return function (_a) {
            var arr = _a[0];
            var a1 = p;
            return [a1].concat(arr.map(function (v, i, arr) {
                return a1 = fn([s[0], v, a1]);
            }));
        };
    };
    ;
    return ComputationService;
}());
ComputationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ComputationService);
export { ComputationService };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=computation.service.js.map