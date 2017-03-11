import {Injectable, Renderer} from '@angular/core';

@Injectable()
export class DOMService {
    constructor(private renderer: Renderer) { }

    // Produce true if one of the tags name array is compatible to the event.target.tagName.
    compare(target: HTMLElement, tagsArr: Array<string>){
        return tagsArr.some((value: string) => target.tagName === value);
    }
    // Set SVG attr-s
    svgAttrSetter(svg: Node, attrs: any): any {
        attrs.forEach((v: string[]) => this.renderer.setElementAttribute(svg, v[0], v[1]));
    }

}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.