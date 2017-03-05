import {Component, OnInit, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'stub-cmpnt',
    template: ` <span id="svg-out"></span>`
})
export class StubComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        document.getElementById('svg-out').appendChild(this.body);
    }
    @Input ('stub-cmpnt-body') body: any;
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.