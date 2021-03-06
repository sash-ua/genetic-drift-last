// angular's modules
import {NgModule} from "@angular/core";
import {BrowserModule, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
// UI
import {MaterialModule} from "@angular/material";
// Modules
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
// Components & services
import {AppComponent} from "./AppComponent";
import {ErrorHandlerService} from "./services/error.handler.service";
import {HammerConfig} from "./app.configs/hammerjs.config";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SharedModule,
        CoreModule,
        MaterialModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [],
    providers: [
        ErrorHandlerService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
    ]
})
export class AppModule {}