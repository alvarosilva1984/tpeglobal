import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
export class Logisticguard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(route, state) {
        return this.authService.isGold();
    }
}
Logisticguard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Logisticguard.ctorParameters = () => [
    { type: AuthService, },
];
