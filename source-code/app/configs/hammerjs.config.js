var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { HammerGestureConfig } from "@angular/platform-browser";
var HammerConfig = (function (_super) {
    __extends(HammerConfig, _super);
    function HammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // override default settings
        _this.overrides = {
            'swipe': { velocity: 0.35, threshold: 15 }
        };
        return _this;
    }
    HammerConfig.prototype.buildHammer = function (element) {
        return new Hammer(element, {
            touchAction: "pan-y",
        });
    };
    return HammerConfig;
}(HammerGestureConfig));
export { HammerConfig };
//Copyright (c) 2017 Alex Tranchenko. All rights reserved.
//MIT License. 
//# sourceMappingURL=hammerjs.config.js.map