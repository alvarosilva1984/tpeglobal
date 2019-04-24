import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
export class Commonguard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(route, state) {
        return this.authService.isBronze();
    }
}
Commonguard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Commonguard.ctorParameters = () => [
    { type: AuthService, },
];
