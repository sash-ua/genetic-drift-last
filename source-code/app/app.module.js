var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// angular's modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// UI
import { MaterialModule } from "@angular/material";
// Modules
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
// Components & services
import { AppComponent } from "./AppComponent";
import { ErrorHandlerService } from "./services/error.handler.service/error.handler.service";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            SharedModule,
            CoreModule,
            MaterialModule.forRoot(),
        ],
        declarations: [
            AppComponent
        ],
        bootstrap: [
            AppComponent
        ],
        exports: [],
        providers: [
            ErrorHandlerService
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map