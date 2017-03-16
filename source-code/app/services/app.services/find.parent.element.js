var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var FindParentElement = (function () {
    function FindParentElement() {
    }
    // Find parent HTML element by tag name.
    FindParentElement.prototype.findHTMLElement = function (el, parentName) {
        return (el.tagName === parentName) ? el : (el.parentElement.nodeName === parentName) ? el.parentElement : this.findHTMLElement(el.parentElement, parentName);
    };
    return FindParentElement;
}());
FindParentElement = __decorate([
    Injectable()
], FindParentElement);
export { FindParentElement };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=find.parent.element.js.map