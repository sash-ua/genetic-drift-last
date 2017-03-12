import {HammerGestureConfig} from "@angular/platform-browser";

export class HammerConfig extends HammerGestureConfig {
    // override default settings
    overrides: {[key: string]: object} = {
        'swipe': {velocity: 0.35, threshold: 15}
    };
    buildHammer(element: HTMLElement) {
        return new Hammer(element, {
            touchAction: "pan-y",
        });
    }
}

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.