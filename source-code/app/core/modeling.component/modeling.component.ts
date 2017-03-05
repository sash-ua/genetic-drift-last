
import {Component, OnInit, trigger, state, style, transition, animate, HostListener} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import {MdDialog, MdDialogRef} from "@angular/material";
import {D3Service} from "../../services/d3.service/d3.service";
import {ComputationService} from "../../services/computation.service/computation.service";
import {ErrorHandlerService} from "../../services/error.handler.service/error.handler.service";
import {AppService} from "../../services/app.services/app.service";
import {DialogsService} from "../../services/app.services/dialogs.service";

export  type Inputs = [{preDefData: number, hint: string, cond: Range}];
export  type Range = Array<number>;

@Component({
    moduleId: module.id,
    template:
    `<section class="wrapper wrapper__modeling">
        <h2>Visualization</h2>
        <form>
            <app-input *ngFor="let input of inputs;" 
                [app-input-data]="input.preDefData" 
                [app-input-hint]="input.hint" 
                [app-input-cond]="input.cond" class="inputs" type="number"></app-input>
            <button md-raised-button class="btn" id="launch">Launch</button>
            <progress-spinner-i [spinner-start-val]="spStVal" 
                                [spinner-tgl]="spTgl" 
                                [@openHide]="spTgl"></progress-spinner-i>
        </form>
        <div id="out-chart"></div>
    </section>`,
    styleUrls: ['modeling.component.css'],
    animations: [
        trigger('openHide',[
            state('true', style({display: 'block', opacity: 1})),
            state('false', style({display: 'none', opacity: 0})),
            transition('* <=> *', [
                animate(300)
            ])])
    ],
    providers: [
        ComputationService,
        ErrorHandlerService,
        AppService,
        DialogsService
    ]
})
export class ModelingComponent implements OnInit{
    private inputs: Inputs = [
        {preDefData: 1000, hint: 'Population, min. 2', cond: [2]},
        {preDefData: 100, hint: 'Generations, min. 1', cond: [1]},
        {preDefData: 2, hint: 'Simulations, min. 1', cond: [1]},
        {preDefData: 0.5, hint: 'Init. Alleles Balance, [0, 1]', cond: [0, 1]},
        {preDefData: 0.1, hint: 'Bottle Neck Probability, [0, 1]', cond: [0, 1]},
        {preDefData: 0.15, hint: 'Natural decline, [0, 1]', cond: [0, 1]},
        {preDefData: 0.2, hint: 'Natural growth, [0, 1]', cond: [0, 1]}];
    protected d3: D3Service;
    private spTgl: string = 'false';
    private spStVal:number = 0;

    constructor(
        d3service: D3Service,
        private computation: ComputationService,
        private errors: ErrorHandlerService,
        private appService: AppService,
        private modalWindow: MdDialog,
        private dialogsService: DialogsService
    ){
        this.d3 = d3service;
    }
    ngOnInit(){
        this.render(this.inputs);

        Observable.fromEvent(document.getElementById('launch'), 'click')
            .do(() => {
                this.spStVal = 0;
                setTimeout(() => {
                    this.spTgl = 'true';
                    this.spStVal = this.appService.rndmGen(15, 40);
                }, 10)
            })
            .debounceTime(400)
            .do(()=> {
                this.spStVal = this.appService.rndmGen(55, 70);
                this.render(this.appService.applInputsData(this.inputs, this.appService.collectionDataInputs('input')));
            })
            .debounceTime(300)
            .do(() => {
                this.spStVal = this.appService.rndmGen(75, 95);
                setTimeout(() => {
                    this.spTgl = 'false';
                    this.spStVal = 100;
                }, 200)
            })
            .subscribe(
                () => {},
                (e) => {this.errors.handleError(e);}
            );

    }
    // Set event listner on host.
    @HostListener('click', ['$event']) clickHandler(e: Event){
        let evTarget: any = e.target;
        if(evTarget.tagName === 'svg'
            || evTarget.tagName === 'g'
            || evTarget.tagName === 'tspan'
            || evTarget.tagName === 'text'
            || evTarget.tagName === 'path'){
                let svg = this.findHTMLElement(evTarget, 'svg').cloneNode(true);
                let windowW = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;
                let windowH = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
                let z = (windowW >= windowH) ? (0.35*windowW) : (0.4*windowH);
                svg.setAttribute('preserveAspectRatio', "xMidYMid meet");
                svg.setAttribute('viewBox', "0 0 305 305");
                svg.setAttribute('height', "100%");
                svg.setAttribute('width', z);
                this.dialogsService
                    .confirm('Graph', svg)
                    .subscribe();
        }
    }
    // Find parent HTML element by tag name.
    findHTMLElement(el: HTMLElement, parName: string): HTMLElement {
        return (el.tagName === parName) ? el : (el.parentElement.nodeName === parName) ? el.parentElement : this.findHTMLElement(el.parentElement, parName);
    }
    // Render array type of Inputs with D3
    render(inputs: Inputs): void {
        let ng = this.computation.arrG(
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
                ng
            )([inputs[2].preDefData]),
            'Generations',
            'A1',
            ['Eff. population size:', this.computation.harmonic1(ng), 'Generations: ', inputs[1].preDefData ],
            inputs[1].preDefData,
            document.getElementById('out-chart')
        );
    }
}

@Component({
    moduleId: module.id,
    selector: 'modal-wndw',
    template: `
    <button md-button class="modal-wndw-btn" 
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
        .modal-wndw-btn{
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