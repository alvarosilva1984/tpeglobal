import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

export class Normalguard {
  constructor(authService) {
    this.authService = authService;
  }

  canActivate(route, state) {
    return this.authService.isLoggedIn();
  }
}

Normalguard.decorators = [
  {type: Injectable},
];
/** @nocollapse */
Normalguard.ctorParameters = () => [
  {type: AuthService,},
];
