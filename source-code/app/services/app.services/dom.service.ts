import {Injectable, Renderer} from '@angular/core';

@Injectable()
export class DOMService {
    constructor(private renderer: Renderer) { }

    // Produce true if one of the tags name array is compatible to the event.target.tagName.
    compare(target: HTMLElement, tagsArr: Array<string>): boolean {
        return tagsArr.some((value: string) => target.tagName === value);
    }
    // Set SVG attr-s
    svgAttrSetter(svg: Node, attrs: any): void {
        attrs.forEach((v: string[]) => this.renderer.setElementAttribute(svg, v[0], v[1]));
    }
    // Find parent HTML element by tag name.
    findHTMLElement(el: Node, parentName: string): Node {
        return (el.nodeName  === parentName)
            ? el
            : (el.parentNode.nodeName === parentName)
                ? el.parentNode
                : this.findHTMLElement(el.parentNode, parentName);
    }

}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.