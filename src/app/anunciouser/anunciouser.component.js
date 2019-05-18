import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";

export class AnunciouserComponent {
  constructor(authService) {
    this.authService = authService;
    this.auth = true;
  }

  ngOnInit() {
    this.authService.getAnuncio().subscribe((anuncios) => {
      this.anuncios = anuncios;
      this.anuncios.sort(function (a, b) {
        return (a.id > b.id) ? -1 : (a.id < b.id) ? 1 : 0;
      });
    });
  }
}

AnunciouserComponent.decorators = [
  {
    type: Component, args: [{
      selector: "app-anunciouser",
      templateUrl: "./anunciouser.component.html",
      styleUrls: ["./anunciouser.component.css"]
    },]
  },
];
/** @nocollapse */
AnunciouserComponent.ctorParameters = () => [
  {type: AuthService,},
];
