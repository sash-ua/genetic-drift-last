import {Component, OnInit, Input, Renderer, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'stub-cmpnt',
    template: ` <div #stubBody></div>`
})
export class StubComponent implements AfterViewInit {
    @ViewChild("stubBody", {read: ElementRef}) stubBody: ElementRef;
    constructor(
        public renderer: Renderer
    ) { }
    ngAfterViewInit() {
        this.renderer.projectNodes(this.stubBody.nativeElement, [this.body]);
    }
    @Input ('stub-cmpnt-body') body: any;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.