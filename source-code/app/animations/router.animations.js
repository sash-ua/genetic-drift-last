import { trigger, state, style, transition, animate } from "@angular/core";
export var slideInRightAnimation = trigger('routeAnimationRight', [
    state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
    })),
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(100%)'
        }),
        animate('0.4s ease-in')
    ]),
    transition(':leave', [
        animate('0.4s ease-out', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);
export var slideInLeftAnimation = trigger('routeAnimationLeft', [
    state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
    })),
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
    ]),
    transition(':leave', [
        animate('0.4s ease-out', style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }))
    ])
]);
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=router.animations.js.map