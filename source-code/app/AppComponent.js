var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "@angular/core";
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'app-root',
        template: "<div class=\"wrapper\">\n        <header>\n            <h1 class=\"header__title txt\">Genetic drift</h1>\n        </header>\n        <main>\n            <nav>\n                <ul class=\"nav\">\n                    <li class=\"nav__el\">\n                        <a routerLink=\"/instruction\" routerLinkActive=\"active\" [class.activeR]=\"active\" class=\"nav_link link\">Introduction</a>\n                    </li>\n                    <li class=\"nav__el\">\n                            <a routerLink=\"/modeling\" routerLinkActive=\"active\" [class.activeR]=\"active\" class=\"nav_link link\">Visualization</a>\n                    </li>\n                </ul>\n            </nav>\n            <div class=\"line-stub\"></div>\n            <router-outlet></router-outlet>\n        </main>\n    </div>",
        styleUrls: ['app.component.css'],
        providers: []
    })
], AppComponent);
export { AppComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=AppComponent.js.map