import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

export class LogoutComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    authService.logout();
    router.navigate(['/auth', 'signin']);
  }
}

LogoutComponent.decorators = [
  {
    type: Component, args: [{
      selector: 'app-logout',
      template: ' '
    },]
  },
];
/** @nocollapse */
LogoutComponent.ctorParameters = () => [
  {type: AuthService,},
  {type: Router,},
];
