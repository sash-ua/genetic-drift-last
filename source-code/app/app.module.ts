// angular's modules
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
// UI
import {MaterialModule} from "@angular/material";
// Modules
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
// Components & services
import {AppComponent} from "./AppComponent";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";

@NgModule({
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
export class AppModule {}