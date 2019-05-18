/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */
import * as i0 from "./showpontos.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "@angular/common";
import * as i3 from "./showpontos.component";
import * as i4 from "../auth/auth.service";
import * as i5 from "@angular/router";

var styles_ShowpontosComponent = [i0.styles];
var RenderType_ShowpontosComponent = i1.ɵcrt({encapsulation: 0, styles: styles_ShowpontosComponent, data: {}});
export {RenderType_ShowpontosComponent as RenderType_ShowpontosComponent};

function View_ShowpontosComponent_1(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "li", [["data-target", "#myCarousel"], ["ngClass", "i == 0 ? 'active' : ''"]], [[1, "data-slide-to", 0]], null, null, null, null)), i1.ɵdid(1, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], {ngClass: [0, "ngClass"]}, null)], function (_ck, _v) {
    var currVal_1 = "i == 0 ? 'active' : ''";
    _ck(_v, 1, 0, currVal_1);
  }, function (_ck, _v) {
    var currVal_0 = _v.context.index;
    _ck(_v, 0, 0, currVal_0);
  });
}

function View_ShowpontosComponent_2(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 10, "div", [["style", "background-image: url('http://placehold.it/1080x400')"]], null, null, null, null, null)), i1.ɵdid(1, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], {ngClass: [0, "ngClass"]}, null), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(3, 0, null, null, 0, "img", [["alt", "Event Image"], ["id", "foto"]], [[8, "src", 4]], null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(5, 0, null, null, 4, "div", [["class", "carousel-caption"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵeld(7, 0, null, null, 1, "h3", [["class", "mycaption"], ["style", "font-size: 5.0vh"]], null, null, null, null, null)), (_l()(), i1.ɵted(8, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, null, ["\n      "]))], function (_ck, _v) {
    var currVal_0 = ((_v.context.index == 0) ? "carousel-item active" : "carousel-item");
    _ck(_v, 1, 0, currVal_0);
  }, function (_ck, _v) {
    var currVal_1 = i1.ɵinlineInterpolate(1, "/assets/img/", _v.context.$implicit.fileimg, "");
    _ck(_v, 3, 0, currVal_1);
    var currVal_2 = _v.context.$implicit.name;
    _ck(_v, 8, 0, currVal_2);
  });
}

function View_ShowpontosComponent_3(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 30, "div", [["class", "col-md-4"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(2, 0, null, null, 25, "div", [["class", "card"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(4, 0, null, null, 4, "div", [["class", "card-header"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵeld(6, 0, null, null, 1, "h4", [["class", "myleft"]], null, null, null, null, null)), (_l()(), i1.ɵted(7, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(10, 0, null, null, 10, "div", [["class", "card-body"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n\n          "])), (_l()(), i1.ɵeld(12, 0, null, null, 4, "p", [["class", "myleft"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n            "])), (_l()(), i1.ɵeld(14, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Endere\u00E7o: "])), (_l()(), i1.ɵted(16, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵeld(18, 0, null, null, 1, "p", [["class", "myleft"]], null, null, null, null, null)), (_l()(), i1.ɵted(19, null, ["", ""])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, null, ["\n\n        "])), (_l()(), i1.ɵeld(22, 0, null, null, 4, "div", [["class", "card-footer"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n          "])), (_l()(), i1.ɵeld(24, 0, null, null, 1, "button", [["class", "btn btn-primary"], ["href", "#myCarousel"], ["id", "visualizar"]], [[1, "data-slide-to", 0]], [[null, "click"]], function (_v, en, $event) {
    var ad = true;
    var _co = _v.component;
    if (("click" === en)) {
      var pd_0 = (_co.onTop() !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  }, null, null)), (_l()(), i1.ɵted(-1, null, ["Visualizar"])), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(29, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "]))], null, function (_ck, _v) {
    var currVal_0 = _v.context.$implicit.name;
    _ck(_v, 7, 0, currVal_0);
    var currVal_1 = _v.context.$implicit.address;
    _ck(_v, 16, 0, currVal_1);
    var currVal_2 = _v.context.$implicit.obs;
    _ck(_v, 19, 0, currVal_2);
    var currVal_3 = _v.context.index;
    _ck(_v, 24, 0, currVal_3);
  });
}

export function View_ShowpontosComponent_0(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 35, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n\n  "])), (_l()(), i1.ɵeld(2, 0, null, null, 32, "div", [["class", "carousel slide"], ["data-ride", "carousel"], ["id", "myCarousel"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(5, 0, null, null, 4, "ol", [["class", "carousel-indicators"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ShowpontosComponent_1)), i1.ɵdid(8, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], {ngForOf: [0, "ngForOf"]}, null), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(12, 0, null, null, 4, "div", [["class", "carousel-inner"], ["role", "listbox"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ShowpontosComponent_2)), i1.ɵdid(15, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], {ngForOf: [0, "ngForOf"]}, null), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(19, 0, null, null, 6, "a", [["class", "carousel-control-prev"], ["data-slide", "prev"], ["href", "#myCarousel"], ["role", "button"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(21, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "carousel-control-prev-icon"], ["style", "color:black"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(23, 0, null, null, 1, "span", [["class", "sr-only"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Previous"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(27, 0, null, null, 6, "a", [["class", "carousel-control-next"], ["data-slide", "next"], ["href", "#myCarousel"], ["role", "button"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(29, 0, null, null, 0, "span", [["aria-hidden", "true"], ["class", "carousel-control-next-icon"], ["style", "color:black"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(31, 0, null, null, 1, "span", [["class", "sr-only"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Next"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵted(-1, null, ["\n"])), (_l()(), i1.ɵted(-1, null, ["\n\n"])), (_l()(), i1.ɵeld(37, 0, null, null, 27, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n\n  "])), (_l()(), i1.ɵeld(39, 0, null, null, 1, "h1", [["class", "my-4"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Pontos TPE"])), (_l()(), i1.ɵted(-1, null, ["\n\n\n  "])), (_l()(), i1.ɵeld(42, 0, null, null, 4, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n\n\n    "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ShowpontosComponent_3)), i1.ɵdid(45, 802816, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], {ngForOf: [0, "ngForOf"]}, null), (_l()(), i1.ɵted(-1, null, ["\n\n  "])), (_l()(), i1.ɵted(-1, null, ["\n\n\n\n\n  "])), (_l()(), i1.ɵeld(48, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n\n\n  "])), (_l()(), i1.ɵeld(50, 0, null, null, 13, "div", [["class", "row mb-4"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(52, 0, null, null, 4, "div", [["class", "col-md-8"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(54, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\"Estas boas novas do Reino ser\u00E3o pregadas em toda a terra habitada\" - Mateus 24:14"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(58, 0, null, null, 4, "div", [["class", "col-md-4"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(60, 0, null, null, 1, "a", [["class", "btn btn-lg btn-secondary btn-block"]], null, [[null, "click"]], function (_v, en, $event) {
    var ad = true;
    var _co = _v.component;
    if (("click" === en)) {
      var pd_0 = (_co.onTop() !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  }, null, null)), (_l()(), i1.ɵted(-1, null, ["Voltar ao topo"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵted(-1, null, ["\n\n\n\n"]))], function (_ck, _v) {
    var _co = _v.component;
    var currVal_0 = _co.pontos;
    _ck(_v, 8, 0, currVal_0);
    var currVal_1 = _co.pontos;
    _ck(_v, 15, 0, currVal_1);
    var currVal_2 = _co.pontos;
    _ck(_v, 45, 0, currVal_2);
  }, null);
}

export function View_ShowpontosComponent_Host_0(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-showpontos", [], null, null, null, View_ShowpontosComponent_0, RenderType_ShowpontosComponent)), i1.ɵdid(1, 114688, null, 0, i3.ShowpontosComponent, [i4.AuthService, i5.Router], null, null)], function (_ck, _v) {
    _ck(_v, 1, 0);
  }, null);
}

var ShowpontosComponentNgFactory = i1.ɵccf("app-showpontos", i3.ShowpontosComponent, View_ShowpontosComponent_Host_0, {}, {}, []);
export {ShowpontosComponentNgFactory as ShowpontosComponentNgFactory};
