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
var AppService = (function () {
    function AppService() {
    }
    // Return random number from min to max (ex. max).
    AppService.prototype.rndmGen = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    // Fn used to collect inputted by user data into array.
    // For first three el-s of HTMLCollection by tag return inager, for others - float.
    AppService.prototype.collectionDataInputs = function (tag) {
        var _this = this;
        return [].slice.call(document.querySelectorAll(tag)).map(function (v, i, arr) {
            return (i === 0 || i === 1 || i === 2) ? parseInt(_this.isExist(v.value), 10) : parseFloat(_this.isExist(v.value));
        });
    };
    // Return 0 if given value is undef. or null or function return value if it exist.
    AppService.prototype.isExist = function (val) {
        return val ? val : 0;
    };
    // Collectioned users data transformed to Inputs type.
    AppService.prototype.applInputsData = function (inputs, arr) {
        inputs.forEach(function (v, i, a) {
            v.preDefData = arr[i];
        });
        return inputs;
    };
    return AppService;
}());
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
export { AppService };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=app.service.js.map