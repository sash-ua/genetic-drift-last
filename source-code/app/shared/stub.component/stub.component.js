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
var StubComponent = (function () {
    function StubComponent() {
    }
    StubComponent.prototype.ngOnInit = function () {
        document.getElementById('svg-out').appendChild(this.body);
    };
    return StubComponent;
}());
__decorate([
    Input('stub-cmpnt-body'),
    __metadata("design:type", Object)
], StubComponent.prototype, "body", void 0);
StubComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'stub-cmpnt',
        template: " <span id=\"svg-out\"></span>"
    }),
    __metadata("design:paramtypes", [])
], StubComponent);
export { StubComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=stub.component.js.map