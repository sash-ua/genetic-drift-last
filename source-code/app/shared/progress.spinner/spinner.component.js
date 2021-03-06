var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { MaterialModule } from "@angular/material";
var SpinnerComponent = (function () {
    function SpinnerComponent() {
        this.mode = 'determinate';
    }
    return SpinnerComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", MaterialModule)
], SpinnerComponent.prototype, "mode", void 0);
__decorate([
    Input('spinner-start-val'),
    __metadata("design:type", MaterialModule)
], SpinnerComponent.prototype, "value", void 0);
SpinnerComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'progress-spinner-i',
        template: "<md-spinner [mode]=\"mode\" [value]=\"value\"></md-spinner>",
        styleUrls: ['spinner.component.css']
    })
], SpinnerComponent);
export { SpinnerComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=spinner.component.js.map