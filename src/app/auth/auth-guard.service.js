import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
export class Authguard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(route, state) {
        return this.authService.isPleno();
    }
}
Authguard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Authguard.ctorParameters = () => [
    { type: AuthService, },
];
