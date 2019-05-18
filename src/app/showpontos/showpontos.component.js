import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import "moment/locale/pt-br";

export class ShowpontosComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.showNow = false;
  }

  ngOnInit() {
    this.authService.getpontos().subscribe((pontos) => {
      this.pontos = pontos;
      this.showNow = true;
    });
  }

  onTop() {
    window.scrollTo(0, 0);
  }
}

ShowpontosComponent.decorators = [
  {
    type: Component, args: [{
      selector: "app-showpontos",
      templateUrl: "./showpontos.component.html",
      styleUrls: ["./showpontos.component.css"]
    },]
  },
];
/** @nocollapse */
ShowpontosComponent.ctorParameters = () => [
  {type: AuthService,},
  {type: Router,},
];
