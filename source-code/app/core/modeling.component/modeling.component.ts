import {Component, OnInit, trigger, state, style, transition, animate, HostListener, HostBinding} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import {MdDialog, MdDialogRef} from "@angular/material";
import {D3Service} from "../../services/d3.service/d3.service";
import {ComputationService} from "../../services/computation.service/computation.service";
import {ErrorHandlerService} from "../../services/error.handler.service/error.handler.service";
import {AppService} from "../../services/app.services/app.service";
import {DialogsService} from "../../services/app.services/dialogs.service";
import {FindParentElement} from "../../services/app.services/find.parent.element";
import {Inputs, svgAttributes} from "../../types/types";
import {DOMService} from "../../services/app.services/dom.service";
import {slideInRightAnimation} from "../../animations/router.animations";

@Component({
    moduleId: module.id,
    template:
    `<section class="wrapper wrapper__modeling">
        <h2>Visualization</h2>
        <form>
            <app-input *ngFor="let input of inputs;" 
                [app-input-data]="input" 
                [mdTooltip]="input.toolTip"
                [mdTooltipPosition]="'left'"
                [mdTooltipShowDelay]="50"
                class="modeling__inputs" type="number"></app-input>
            <button md-raised-button class="modeling__btn" id="launch">Launch</button>
            <progress-spinner-i [spinner-start-val]="spStVal" 
                                [spinner-tgl]="spTgl" 
                                [@openHide]="spTgl"></progress-spinner-i>
        </form>
        <div id="out-chart"></div>
    </section>`,
    styleUrls: ['modeling.component.css'],
    animations: [
        trigger('openHide',[
            state('true', style({display: 'block', opacity: 1, transform: 'translateZ(0)'})),
            state('false', style({display: 'none', opacity: 0, transform: 'translateZ(0)'})),
            transition('* <=> *', [
                animate(300)
            ])]),
        slideInRightAnimation
    ],
    providers: [
        ComputationService,
        ErrorHandlerService,
        AppService,
        DialogsService,
        FindParentElement,
        DOMService
    ]
})
export class ModelingComponent implements OnInit{
    private MWTITLE: string = "Graph";
    private SVGATTRS: svgAttributes = [['preserveAspectRatio', 'xMidYMid meet'], ['viewBox', '0 0 305 305'], ['height', '100%'], ['width', this.AS.dimension(0.35, 0.4)]];
    private SVGCOMPS: Array<string> = ['svg', 'g', 'tspan', 'text', 'path'];
    private inputs: Inputs = [
        {preDefData: 1000, hint: 'Population', dvdrColor: 'warn', interval: [2], toolTip: 'Integer number from 2'},
        {preDefData: 100, hint: 'Generations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1'},
        {preDefData: 2, hint: 'Simulations', dvdrColor: 'warn', interval: [1], toolTip: 'Integer number from 1'},
        {preDefData: 0.5, hint: 'Init. Alleles Balance', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.164'},
        {preDefData: 0.1, hint: 'Bottle Neck Probability', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.2'},
        {preDefData: 0.15, hint: 'Natural decline', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.77.'},
        {preDefData: 0.2, hint: 'Natural growth', dvdrColor: 'primary', interval: [0, 1], toolTip: 'Value from 0 to 1, for ex. 0.09.'}];
    private spTgl: string = 'false';
    private spStVal: number = 0;

    constructor(
        private d3: D3Service,
        private computation: ComputationService,
        private errors: ErrorHandlerService,
        private AS: AppService,
        private DS: DialogsService,
        private FPE: FindParentElement,
        private DOM: DOMService
    ){}
    ngOnInit(){
        this.render(this.inputs);
        Observable.fromEvent(document.getElementById('launch'), 'click')
            .do(() => {
                this.spStVal = 0;
                setTimeout(() => {
                    this.spTgl = 'true';
                    this.spStVal = this.AS.rndmGen(15, 40);
                }, 4)
            })
            .debounceTime(400)
            .do(()=> {
                this.spStVal = this.AS.rndmGen(55, 70);
                this.render(this.AS.applInputsData(this.inputs, this.AS.collectionDataInputs('input')));
            })
            .debounceTime(300)
            .do(() => {
                this.spStVal = this.AS.rndmGen(75, 95);
                setTimeout(() => {
                    this.spTgl = 'false';
                    this.spStVal = 100;
                }, 200)
            })
            .subscribe(
                () => {},
                (e: Error) => {this.errors.handleError(e);}
            );
    }
    // Set event listener on the host.
    @HostListener('click', ['$event']) clickHandler(e: Event){
        const TARGET: any = e.target;
        if(this.DOM.compare(TARGET, this.SVGCOMPS)){
            const SVG = this.FPE.findHTMLElement(TARGET, 'svg').cloneNode(true);
            this.DOM.svgAttrSetter(SVG, this.SVGATTRS);
            this.DS.confirm(this.MWTITLE, SVG)
        }
    };
    @HostBinding('@routeAnimationRight') routeAnimationRight = true;
    @HostBinding('style.position')  position = 'absolute';

    // Render array type of Inputs with D3
    render(inputs: Inputs): void {
        const NG = this.computation.arrG(
            this.computation.NGen,
            this.computation.NRandom,
            inputs[0].preDefData,
            inputs[6].preDefData,
            inputs[5].preDefData,
            inputs[4].preDefData)([inputs[1].preDefData]);
            // Draw chart
            this.d3.drawChart(
            this.computation.arrG(
                this.computation.cmptnAlleles(
                    this.computation.bounchCoin1,
                    inputs[3].preDefData,
                    this.computation.tossing1
                ),
                NG
            )([inputs[2].preDefData]),
            'Generations',
            'A1',
            ['Eff. population size:', this.computation.harmonic1(NG), 'Generations: ', inputs[1].preDefData ],
            inputs[1].preDefData,
            document.getElementById('out-chart')
        );
    }
}

@Component({
    selector: 'modal-wndw',
    template: `
    <button md-button class="modal-wndw__btn" 
        (click)="dialogRef.close()">X</button>
    <h2>{{ title }}</h2>
    <stub-cmpnt [stub-cmpnt-body]="element"></stub-cmpnt>`,
    styles: [`
        h2{
            text-align: center; 
            text-transform: uppercase;
            margin: 0 0 0 40px;
            padding: 0;
        } 
        .modal-wndw__btn{
            min-width: 40px; 
            padding: 0;
            float: right;
        }
    `]
})
export class ModalWindowComponent{
    public title: string;
    public element: SVGAElement;
    constructor(public dialogRef: MdDialogRef<ModalWindowComponent>) {}
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.