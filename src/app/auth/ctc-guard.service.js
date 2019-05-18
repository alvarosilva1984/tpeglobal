import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

export class Ctcguard {
  constructor(authService) {
    this.authService = authService;
  }

  canActivate(route, state) {
    return this.authService.isBronze() || this.authService.isCtc();
  }
}

Ctcguard.decorators = [
  {type: Injectable},
];
/** @nocollapse */
Ctcguard.ctorParameters = () => [
  {type: AuthService,},
];
