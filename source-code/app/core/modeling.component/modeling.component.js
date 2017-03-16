var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, HostBinding, ViewChild, ElementRef } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import { MdDialogRef } from "@angular/material";
import { D3Service } from "../../services/d3.service/d3.service";
import { ComputationService } from "../../services/computation.service/computation.service";
import { ErrorHandlerService } from "../../services/error.handler.service/error.handler.service";
import { AppService } from "../../services/app.services/app.service";
import { DialogsService } from "../../services/app.services/dialogs.service";
import { DOMService } from "../../services/app.services/dom.service";
import { AnimationsServices } from "../../services/animations.service/animations.service";
var ModelingComponent = (function () {
    function ModelingComponent(d3, computation, errors, AS, DS, DOM) {
        this.d3 = d3;
        this.computation = computation;
        this.errors = errors;
        this.AS = AS;
        this.DS = DS;
        this.DOM = DOM;
        this.MWTITLE = "Graph";
        this.SVGATTRS = [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', this.AS.dimension(0.35, 0.4)]];
        this.SVGCOMPS = ['svg', 'g', 'tspan', 'text', 'path'];
        this.inputs = [
            { preDefData: 1000, hint: 'Population', dvdrColor: 'warn', interval: [2], toolTip: 'Integer number from 2' },
            { preDefData: 100, hint: 'Generations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1' },
            { preDefData: 2, hint: 'Simulations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1' },
            { preDefData: 0.5, hint: 'Init. Alleles Balance', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.164' },
            { preDefData: 0.1, hint: 'Bottle Neck Probability', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.2' },
            { preDefData: 0.15, hint: 'Natural decline', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.77.' },
            { preDefData: 0.2, hint: 'Natural growth', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.09.' }
        ];
        this.spTgl = 'out';
        this.spStVal = 0;
        this.routeAnimationRight = true;
        this.position = 'absolute';
    }
    // Set event listener on the host.
    ModelingComponent.prototype.clickHandler = function (e) {
        var TARGET = e.target;
        if (this.DOM.compare(TARGET, this.SVGCOMPS)) {
            var SVG = this.DOM.findHTMLElement(TARGET, 'svg');
            if (SVG.getAttribute('data-d3-graph')) {
                var SVGClONE = SVG.cloneNode(true);
                this.DOM.svgAttrSetter(SVGClONE, this.SVGATTRS);
                this.DS.confirm(this.MWTITLE, SVGClONE);
            }
        }
    };
    ;
    ModelingComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var GV = this.graphView.nativeElement;
        // Generate graph while rendering page.
        this.render(this.inputs, GV);
        // Button 'Lunch' handler. Produce D3 Graph after clicking and manage spinner.
        Observable.fromEvent(this.launch.nativeElement, 'click')
            .do(function () {
            _this.spStVal = 0;
            setTimeout(function () {
                _this.spTgl = 'in';
                _this.spStVal = _this.AS.rndmGen(15, 40);
            }, 4);
        })
            .debounceTime(400)
            .do(function () {
            _this.spStVal = _this.AS.rndmGen(55, 70);
            _this.render(_this.AS.applInputsData(_this.inputs, _this.AS.collectionDataInputs('input')), GV);
        })
            .debounceTime(300)
            .do(function () {
            _this.spStVal = _this.AS.rndmGen(75, 95);
            setTimeout(function () {
                _this.spTgl = 'out';
                _this.spStVal = 100;
            }, 200);
        })
            .subscribe(function () { }, function (e) { _this.errors.handleError(e); });
    };
    // Render array type of Inputs with D3
    ModelingComponent.prototype.render = function (inputs, view) {
        var NG = this.computation.arrG(this.computation.NGen, this.computation.NRandom, inputs[0].preDefData, inputs[6].preDefData, inputs[5].preDefData, inputs[4].preDefData)([inputs[1].preDefData]);
        // Draw chart
        this.d3.drawChart(this.computation.arrG(this.computation.cmptnAlleles(this.computation.bounchCoin1, inputs[3].preDefData, this.computation.tossing1), NG)([inputs[2].preDefData]), 'Generations', 'A1', ['Eff. population size:', this.computation.harmonic1(NG), 'Generations: ', inputs[1].preDefData], inputs[1].preDefData, view);
    };
    return ModelingComponent;
}());
__decorate([
    ViewChild("launch", { read: ElementRef }),
    __metadata("design:type", ElementRef)
], ModelingComponent.prototype, "launch", void 0);
__decorate([
    ViewChild("graphView", { read: ElementRef }),
    __metadata("design:type", ElementRef)
], ModelingComponent.prototype, "graphView", void 0);
__decorate([
    HostBinding('@routeAnimationRight'),
    __metadata("design:type", Object)
], ModelingComponent.prototype, "routeAnimationRight", void 0);
__decorate([
    HostBinding('style.position'),
    __metadata("design:type", Object)
], ModelingComponent.prototype, "position", void 0);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ModelingComponent.prototype, "clickHandler", null);
ModelingComponent = __decorate([
    Component({
        moduleId: module.id,
        template: "<section class=\"wrapper wrapper__modeling\">\n        <h2>Visualization</h2>\n        <form>\n            <app-input *ngFor=\"let input of inputs;\" \n                [app-input-data]=\"input\" \n                [mdTooltip]=\"input.toolTip\"\n                [mdTooltipPosition]=\"'left'\"\n                [mdTooltipShowDelay]=\"50\"\n                class=\"modeling__inputs\" type=\"number\">\n            </app-input>\n            <button md-raised-button class=\"modeling__btn\" #launch>Launch</button>\n            <progress-spinner-i [spinner-start-val]=\"spStVal\"\n                                [@openHide]=\"spTgl\">   \n            </progress-spinner-i>       \n        </form>\n        <div id=\"graphView\" #graphView></div>\n    </section>",
        styleUrls: ['modeling.component.css'],
        animations: [
            AnimationsServices.animatonThreeStates('routeAnimationRight', { opacity: 1, transform: 'translateX(0)' }, [{ opacity: 0, transform: 'translateX(100%)' }, { opacity: 0, transform: 'translateX(100%)' }], ['0.4s ease-in', '0.4s ease-out']),
            AnimationsServices.animatonTwoStates('openHide', ['in', 'out'], [{ display: 'block', opacity: 1, transform: 'translateZ(0)' }, { display: 'none', opacity: 0, transform: 'translateZ(0)' }], ['300ms', '300ms'])
        ],
        providers: [
            ComputationService,
            ErrorHandlerService,
            AppService,
            DialogsService,
            DOMService
        ]
    }),
    __metadata("design:paramtypes", [D3Service,
        ComputationService,
        ErrorHandlerService,
        AppService,
        DialogsService,
        DOMService])
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