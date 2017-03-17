var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var InputValidatorService = (function () {
    function InputValidatorService() {
    }
    // Input string validation. First stage, second's in app.service.applInputsData
    InputValidatorService.prototype.inputValidator = function (val, cond) {
        var v = +val;
        if (v >= 0 && !cond[1]) {
            return val;
        }
        else if (v >= 0 && cond[1] && v <= cond[1]) {
            return val;
        }
        else {
            return 0;
        }
    };
    return InputValidatorService;
}());
InputValidatorService = __decorate([
    Injectable()
], InputValidatorService);
export { InputValidatorService };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=inut.validator.service.js.map