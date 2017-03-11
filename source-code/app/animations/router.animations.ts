import {AnimationEntryMetadata, trigger, state, style, transition, animate} from "@angular/core";

export const slideInRightAnimation: AnimationEntryMetadata =
    trigger('routeAnimationRight', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(100%)'
            }),
            animate('0.4s ease-in')
        ]),
        transition(':leave', [
            animate('0.4s ease-out',
            style({
                opacity: 0,
                transform: 'translateX(100%)'
            }))
        ])
    ]);
export const slideInLeftAnimation: AnimationEntryMetadata = trigger('routeAnimationLeft', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('0.4s ease-in')
        ]),
        transition(':leave', [
            animate('0.4s ease-out',
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }))
        ])
    ]);

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License.