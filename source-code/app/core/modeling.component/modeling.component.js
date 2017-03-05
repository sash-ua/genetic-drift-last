var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import { MdDialog, MdDialogRef } from "@angular/material";
import { D3Service } from "../../services/d3.service/d3.service";
import { ComputationService } from "../../services/computation.service/computation.service";
import { ErrorHandlerService } from "../../services/error.handler.service/error.handler.service";
import { AppService } from "../../services/app.services/app.service";
import { DialogsService } from "../../services/app.services/dialogs.service";
var ModelingComponent = (function () {
    function ModelingComponent(d3service, computation, errors, appService, modalWindow, dialogsService) {
        this.computation = computation;
        this.errors = errors;
        this.appService = appService;
        this.modalWindow = modalWindow;
        this.dialogsService = dialogsService;
        this.inputs = [
            { preDefData: 1000, hint: 'Population, min. 2', cond: [2] },
            { preDefData: 100, hint: 'Generations, min. 1', cond: [1] },
            { preDefData: 2, hint: 'Simulations, min. 1', cond: [1] },
            { preDefData: 0.5, hint: 'Init. Alleles Balance, [0, 1]', cond: [0, 1] },
            { preDefData: 0.1, hint: 'Bottle Neck Probability, [0, 1]', cond: [0, 1] },
            { preDefData: 0.15, hint: 'Natural decline, [0, 1]', cond: [0, 1] },
            { preDefData: 0.2, hint: 'Natural growth, [0, 1]', cond: [0, 1] }
        ];
        this.spTgl = 'false';
        this.spStVal = 0;
        this.d3 = d3service;
    }
    ModelingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.render(this.inputs);
        Observable.fromEvent(document.getElementById('launch'), 'click')
            .do(function () {
            _this.spStVal = 0;
            setTimeout(function () {
                _this.spTgl = 'true';
                _this.spStVal = _this.appService.rndmGen(15, 40);
            }, 10);
        })
            .debounceTime(400)
            .do(function () {
            _this.spStVal = _this.appService.rndmGen(55, 70);
            _this.render(_this.appService.applInputsData(_this.inputs, _this.appService.collectionDataInputs('input')));
        })
            .debounceTime(300)
            .do(function () {
            _this.spStVal = _this.appService.rndmGen(75, 95);
            setTimeout(function () {
                _this.spTgl = 'false';
                _this.spStVal = 100;
            }, 200);
        })
            .subscribe(function () { }, function (e) { _this.errors.handleError(e); });
    };
    // Set event listner on host.
    ModelingComponent.prototype.clickHandler = function (e) {
        var evTarget = e.target;
        if (evTarget.tagName === 'svg'
            || evTarget.tagName === 'g'
            || evTarget.tagName === 'tspan'
            || evTarget.tagName === 'text'
            || evTarget.tagName === 'path') {
            var svg = this.findHTMLElement(evTarget, 'svg').cloneNode(true);
            var windowW = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;
            var windowH = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
            var z = (windowW >= windowH) ? (0.35 * windowW) : (0.4 * windowH);
            svg.setAttribute('preserveAspectRatio', "xMidYMid meet");
            svg.setAttribute('viewBox', "0 0 305 305");
            svg.setAttribute('height', "100%");
            svg.setAttribute('width', z);
            this.dialogsService
                .confirm('Graph', svg)
                .subscribe();
        }
    };
    // Find parent HTML element by tag name.
    ModelingComponent.prototype.findHTMLElement = function (el, parName) {
        return (el.tagName === parName) ? el : (el.parentElement.nodeName === parName) ? el.parentElement : this.findHTMLElement(el.parentElement, parName);
    };
    // Render array type of Inputs with D3
    ModelingComponent.prototype.render = function (inputs) {
        var ng = this.computation.arrG(this.computation.NGen, this.computation.NRandom, inputs[0].preDefData, inputs[6].preDefData, inputs[5].preDefData, inputs[4].preDefData)([inputs[1].preDefData]);
        // Draw chart
        this.d3.drawChart(this.computation.arrG(this.computation.cmptnAlleles(this.computation.bounchCoin1, inputs[3].preDefData, this.computation.tossing1), ng)([inputs[2].preDefData]), 'Generations', 'A1', ['Eff. population size:', this.computation.harmonic1(ng), 'Generations: ', inputs[1].preDefData], inputs[1].preDefData, document.getElementById('out-chart'));
    };
    return ModelingComponent;
}());
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ModelingComponent.prototype, "clickHandler", null);
ModelingComponent = __decorate([
    Component({
        moduleId: module.id,
        template: "<section class=\"wrapper wrapper__modeling\">\n        <h2>Visualization</h2>\n        <form>\n            <app-input *ngFor=\"let input of inputs;\" \n                [app-input-data]=\"input.preDefData\" \n                [app-input-hint]=\"input.hint\" \n                [app-input-cond]=\"input.cond\" class=\"inputs\" type=\"number\"></app-input>\n            <button md-raised-button class=\"btn\" id=\"launch\">Launch</button>\n            <progress-spinner-i [spinner-start-val]=\"spStVal\" \n                                [spinner-tgl]=\"spTgl\" \n                                [@openHide]=\"spTgl\"></progress-spinner-i>\n        </form>\n        <div id=\"out-chart\"></div>\n    </section>",
        styleUrls: ['modeling.component.css'],
        animations: [
            trigger('openHide', [
                state('true', style({ display: 'block', opacity: 1 })),
                state('false', style({ display: 'none', opacity: 0 })),
                transition('* <=> *', [
                    animate(300)
                ])
            ])
        ],
        providers: [
            ComputationService,
            ErrorHandlerService,
            AppService,
            DialogsService
        ]
    }),
    __metadata("design:paramtypes", [D3Service,
        ComputationService,
        ErrorHandlerService,
        AppService,
        MdDialog,
        DialogsService])
], ModelingComponent);
export { ModelingComponent };
var ModalWindowComponent = (function () {
    function ModalWindowComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return ModalWindowComponent;
}());
ModalWindowComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'modal-wndw',
        template: "\n    <button md-button class=\"modal-wndw-btn\" \n        (click)=\"dialogRef.close()\">X</button>\n    <h2>{{ title }}</h2>\n    <stub-cmpnt [stub-cmpnt-body]=\"element\"></stub-cmpnt>",
        styles: ["\n        h2{\n            text-align: center; \n            text-transform: uppercase;\n            margin: 0 0 0 40px;\n            padding: 0;\n        } \n        .modal-wndw-btn{\n            min-width: 40px; \n            padding: 0;\n            float: right;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [MdDialogRef])
], ModalWindowComponent);
export { ModalWindowComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=modeling.component.js.map