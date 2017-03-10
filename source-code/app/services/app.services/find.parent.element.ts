import { Injectable } from '@angular/core';

@Injectable()
export class FindParentElement {

    constructor() { }
    // Find parent HTML element by tag name.
    findHTMLElement(el: HTMLElement, parentName: string): HTMLElement {
        return (el.tagName === parentName) ? el : (el.parentElement.nodeName === parentName) ? el.parentElement : this.findHTMLElement(el.parentElement, parentName);
    }

}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.