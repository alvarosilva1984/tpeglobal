import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
export class Adminguard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(route, state) {
        return this.authService.isAuthenticated();
    }
}
Adminguard.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Adminguard.ctorParameters = () => [
    { type: AuthService, },
];
