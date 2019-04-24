/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./telegramapi.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "@angular/common";
import * as i3 from "./telegramapi.component";
import * as i4 from "../auth/auth.service";
import * as i5 from "@angular/router";
var styles_TelegramapiComponent = [i0.styles];
var RenderType_TelegramapiComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_TelegramapiComponent, data: {} });
export { RenderType_TelegramapiComponent as RenderType_TelegramapiComponent };
function View_TelegramapiComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "span", [["style", "color:green"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(2, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Cadastrado"])), (_l()(), i1.ɵted(-1, null, ["\n      "]))], null, null); }
function View_TelegramapiComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "span", [["style", "color:red"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n        "])), (_l()(), i1.ɵeld(2, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, [" Sem cadastro"])), (_l()(), i1.ɵted(-1, null, ["\n      "]))], null, null); }
export function View_TelegramapiComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 61, "div", [["class", "container"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵeld(2, 0, null, null, 58, "div", [["class", "form-group"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(4, 0, null, null, 19, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(6, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(8, 0, null, null, 10, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(10, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["STATUS: "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_TelegramapiComponent_1)), i1.ɵdid(14, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_TelegramapiComponent_2)), i1.ɵdid(17, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(20, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n      "])), (_l()(), i1.ɵeld(22, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵted(-1, null, ["\n\n    "])), (_l()(), i1.ɵeld(25, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Para receber as designa\u00E7\u00F5es por telegram, execute os seguintes passos:"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(28, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["1. Baixe o aplicativo para o seu celular"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(31, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["2. Configure o aplicativo com o seu numero"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(34, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["3. Clique no bot\u00E3o abaixo para vincular sua conta do site com o telegram"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(37, 0, null, null, 1, "button", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onCadastro() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Cadastrar Telegram"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(40, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(42, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n\n    "])), (_l()(), i1.ɵeld(44, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["4. Dentro do aplicativo, clique no bot\u00E3o \"come\u00E7ar\""])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(47, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Pronto, voc\u00EA j\u00E1 pode receber suas designa\u00E7\u00F5es."])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(50, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(52, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Para entrar no grupo de substitui\u00E7\u00F5es, clique no bot\u00E3o abaixo:"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(55, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i1.ɵted(-1, null, ["Obs.: Voc\u00EA deve estar cadastrado no telegram"])), (_l()(), i1.ɵted(-1, null, ["\n    "])), (_l()(), i1.ɵeld(58, 0, null, null, 1, "button", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onGoGroup() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i1.ɵted(-1, null, ["Grupo Substitui\u00E7\u00E3o"])), (_l()(), i1.ɵted(-1, null, ["\n  "])), (_l()(), i1.ɵted(-1, null, ["\n\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.user.telegram; _ck(_v, 14, 0, currVal_0); var currVal_1 = !_co.user.telegram; _ck(_v, 17, 0, currVal_1); }, null); }
export function View_TelegramapiComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-telegramapi", [], null, null, null, View_TelegramapiComponent_0, RenderType_TelegramapiComponent)), i1.ɵdid(1, 114688, null, 0, i3.TelegramapiComponent, [i4.AuthService, i5.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var TelegramapiComponentNgFactory = i1.ɵccf("app-telegramapi", i3.TelegramapiComponent, View_TelegramapiComponent_Host_0, {}, {}, []);
export { TelegramapiComponentNgFactory as TelegramapiComponentNgFactory };