import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

export class TelegramapiComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.linktelegram = `/`;
  }

  ngOnInit() {
    this.authService.getPerfil()
      .subscribe(data => {
        console.log(data);
        this.user = data;
      });
  }

  onGoGroup() {
    window.location.href = "https://t.me/joinchat/Ht5s4UnEd4DdUGC4K6MHzA";
  }

  onCadastro() {
    this.authService.cadastroTelegram()
      .subscribe(data => {
        if (data)
          window.location.href = `https://telegram.me/TPEstoandre_bot?start=${data}`;
      });
  }
}

TelegramapiComponent.decorators = [
  {
    type: Component, args: [{
      selector: 'app-telegramapi',
      templateUrl: './telegramapi.component.html',
      styleUrls: ['./telegramapi.component.css']
    },]
  },
];
/** @nocollapse */
TelegramapiComponent.ctorParameters = () => [
  {type: AuthService,},
  {type: Router,},
];
