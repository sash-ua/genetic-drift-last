var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Page404Component } from "./page.404.component/page.404.component";
import { InstructionComponent } from "./inctruction.component/instruction.component";
import { ModelingComponent, ModalWindowComponent } from "./modeling.component/modeling.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { D3Service } from "../services/d3.service";
import { DialogsService } from "../services/dialogs.service";
import { MaterialModule } from "@angular/material";
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            AppRoutingModule,
            SharedModule,
            MaterialModule
        ],
        declarations: [
            Page404Component,
            InstructionComponent,
            ModelingComponent,
            ModalWindowComponent
        ],
        exports: [
            Page404Component,
            InstructionComponent,
            ModelingComponent,
            AppRoutingModule,
            ModalWindowComponent
        ],
        providers: [
            D3Service,
            DialogsService
        ],
        entryComponents: [
            ModalWindowComponent,
        ],
    })
], CoreModule);
export { CoreModule };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=core.module.js.map