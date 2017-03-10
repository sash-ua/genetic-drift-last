var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, trigger, state, style, transition, animate, HostListener, Renderer } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import { MdDialogRef } from "@angular/material";
import { D3Service } from "../../services/d3.service/d3.service";
import { ComputationService } from "../../services/computation.service/computation.service";
import { ErrorHandlerService } from "../../services/error.handler.service/error.handler.service";
import { AppService } from "../../services/app.services/app.service";
import { DialogsService } from "../../services/app.services/dialogs.service";
import { FindParentElement } from "../../services/app.services/find.parent.element";
var ModelingComponent = (function () {
    function ModelingComponent(d3, computation, errors, AS, renderer, DS, FPE) {
        this.d3 = d3;
        this.computation = computation;
        this.errors = errors;
        this.AS = AS;
        this.renderer = renderer;
        this.DS = DS;
        this.FPE = FPE;
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
    }
    ModelingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.render(this.inputs);
        Observable.fromEvent(document.getElementById('modeling___launch'), 'click')
            .do(function () {
            _this.spStVal = 0;
            setTimeout(function () {
                _this.spTgl = 'true';
                _this.spStVal = _this.AS.rndmGen(15, 40);
            }, 10);
        })
            .debounceTime(400)
            .do(function () {
            _this.spStVal = _this.AS.rndmGen(55, 70);
            _this.render(_this.AS.applInputsData(_this.inputs, _this.AS.collectionDataInputs('input')));
        })
            .debounceTime(300)
            .do(function () {
            _this.spStVal = _this.AS.rndmGen(75, 95);
            setTimeout(function () {
                _this.spTgl = 'false';
                _this.spStVal = 100;
            }, 200);
        })
            .subscribe(function () { }, function (e) { _this.errors.handleError(e); });
    };
    // Set event listener on host.
    ModelingComponent.prototype.clickHandler = function (e) {
        var TARGET = e.target;
        this.svgAttrSetter(TARGET, ['svg', 'g', 'tspan', 'text', 'path'], 'svg', 'Graph', [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', this.AS.svgWidth(0.35, 0.4)]], this.DS.confirm);
    };
    ;
    ModelingComponent.prototype.svgAttrSetter = function (target, tagsArr, svgTag, title, attrs, DSFn) {
        var _this = this;
        if (tagsArr.some(function (value) { return target.tagName === value; })) {
            var SVG_1 = this.FPE.findHTMLElement(target, svgTag).cloneNode(true);
            attrs.forEach(function (v) { return _this.renderer.setElementAttribute(SVG_1, v[0], v[1]); });
            DSFn(title, SVG_1).subscribe();
        }
    };
    // Render array type of Inputs with D3
    ModelingComponent.prototype.render = function (inputs) {
        var NG = this.computation.arrG(this.computation.NGen, this.computation.NRandom, inputs[0].preDefData, inputs[6].preDefData, inputs[5].preDefData, inputs[4].preDefData)([inputs[1].preDefData]);
        // Draw chart
        this.d3.drawChart(this.computation.arrG(this.computation.cmptnAlleles(this.computation.bounchCoin1, inputs[3].preDefData, this.computation.tossing1), NG)([inputs[2].preDefData]), 'Generations', 'A1', ['Eff. population size:', this.computation.harmonic1(NG), 'Generations: ', inputs[1].preDefData], inputs[1].preDefData, document.getElementById('out-chart'));
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
        template: "<section class=\"wrapper wrapper__modeling\">\n        <h2>Visualization</h2>\n        <form>\n            <app-input *ngFor=\"let input of inputs;\" \n                [app-input-data]=\"input.preDefData\" \n                [app-input-hint]=\"input.hint\" \n                [app-input-cond]=\"input.cond\" class=\"modeling__inputs\" type=\"number\"></app-input>\n            <button md-raised-button class=\"modeling__btn\" id=\"modeling___launch\">Launch</button>\n            <progress-spinner-i [spinner-start-val]=\"spStVal\" \n                                [spinner-tgl]=\"spTgl\" \n                                [@openHide]=\"spTgl\"></progress-spinner-i>\n        </form>\n        <div id=\"out-chart\"></div>\n    </section>",
        styleUrls: ['modeling.component.css'],
        animations: [
            trigger('openHide', [
                state('true', style({ display: 'block', opacity: 1, transform: 'translateZ(0)' })),
                state('false', style({ display: 'none', opacity: 0, transform: 'translateZ(0)' })),
                transition('* <=> *', [
                    animate(300)
                ])
            ])
        ],
        providers: [
            ComputationService,
            ErrorHandlerService,
            AppService,
            DialogsService,
            FindParentElement
        ]
    }),
    __metadata("design:paramtypes", [D3Service,
        ComputationService,
        ErrorHandlerService,
        AppService,
        Renderer,
        DialogsService,
        FindParentElement])
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
        selector: 'modal-wndw',
        template: "\n    <button md-button class=\"modal-wndw__btn\" \n        (click)=\"dialogRef.close()\">X</button>\n    <h2>{{ title }}</h2>\n    <stub-cmpnt [stub-cmpnt-body]=\"element\"></stub-cmpnt>",
        styles: ["\n        h2{\n            text-align: center; \n            text-transform: uppercase;\n            margin: 0 0 0 40px;\n            padding: 0;\n        } \n        .modal-wndw__btn{\n            min-width: 40px; \n            padding: 0;\n            float: right;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [MdDialogRef])
], ModalWindowComponent);
export { ModalWindowComponent };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=modeling.component.js.map