"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var AppComponent = (function () {
    function AppComponent(sanitizer) {
        this.sanitizer = sanitizer;
        this.dangerousStyle = "\n                                width: 100px;\n                                height: 100px;\n                                margin: 5px 5px;\n                                padding: 2px;\n                                cursor: pointer;\n                                text-align: center; \n                                background: #000; \n                                border-radius:50%; \n                                font-size: 22px; \n                                line-height: 100px; \n                                color: #fff;\n                            ";
        this.trustedStyle = sanitizer.bypassSecurityTrustStyle(this.dangerousStyle);
    }
    AppComponent.prototype.onclick = function (value) {
        var sticky = $('#sticky' + value);
        var exact_offset_left = sticky.offset().left; //calculate the position of sticky/original element from left
        var exact_offset_top = sticky.offset().top; //calculate the position of the sticky/original element from top
        var offset_left = $('#region').offset().left; //calculate the position of region from left
        var div = $("#sticky" + value).clone().appendTo("body"); //add the element in the body
        div.css('position', 'absolute'); //set the position to absolute to overlap
        div.offset({ top: exact_offset_top, left: exact_offset_left }); //calculate the position of the clone
        setTimeout(function () {
            div.offset({ left: offset_left }); //move the element till region
            div.css('opacity', '0'); //fade the element while moving
            div.css({ transition: "left 3s ease-in-out, opacity 4s" }); //move the element from original position to till region
        }, 10);
        setTimeout(function () {
            div.remove(); //remove the dynamic element
        }, 4000);
        console.log('animater'); //print in console
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\n    <div id=\"sticky1\" [style]=\"trustedStyle\" (click)=\"onclick(1)\">Click Me</div>\n\n    <div id=\"sticky2\" [style]=\"trustedStyle\" (click)=\"onclick(2)\">Click Me</div> \n\n\n    <div id=\"region\">Region</div>\n\n    ",
            styles: ["\n\n    #region {\n        position: absolute;\n        top: 0px;\n        text-align: center;\n        left: 500px;\n        width: 300px;\n        height: 500px;\n        border: solid 2px;\n    }\n\n    "]
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map