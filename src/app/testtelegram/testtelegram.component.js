import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Telegram} from "./telegram.model";
import {AuthService} from "../auth/auth.service";
import 'moment/locale/pt-br';

export class TesttelegramComponent {
  constructor(authService) {
    this.authService = authService;
    this.idresposta = " ";
    this.respostadada = " ";
  }

  ngOnInit() {
    this.telegramResposta();
    this.telegramForm = new FormGroup({
      message: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const telegram = new Telegram(this.telegramForm.value.message, this.telegramForm.value.id);
    this.authService.enviatelegram(telegram)
      .subscribe(data => {
        console.log(data);
        alert("Telegram enviado");
        //   this.idresposta = data.obj.dados.id;
        //  alert(data.obj.mensagem);
      }, error => {
        console.error(error);
        alert("Ocorreu um erro");
      });
  }

  telegramResposta() {
    this.authService.gettelegramresposta()
      .subscribe(data => {
        console.log(data);
        //if(data.obj.dados.respostas.length > 0)
        //this.respostadada = data.obj.dados.respostas[0].resposta;
      }, error => console.error(error));
  }

  myId() {
    return this.idresposta;
  }
}

TesttelegramComponent.decorators = [
  {
    type: Component, args: [{
      selector: 'app-telegram',
      templateUrl: './testtelegram.component.html',
    },]
  },
];
/** @nocollapse */
TesttelegramComponent.ctorParameters = () => [
  {type: AuthService,},
];
