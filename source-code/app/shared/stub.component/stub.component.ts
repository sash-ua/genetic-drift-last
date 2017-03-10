import {Component, OnInit, Input, Renderer} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'stub-cmpnt',
    template: ` <div id="stub-body"></div>`
})
export class StubComponent implements OnInit {
    constructor(
        private renderer: Renderer
    ) { }
    ngOnInit() {
        this.renderer.projectNodes(document.getElementById('stub-body'), [this.body]);
    }
    @Input ('stub-cmpnt-body') body: any;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.