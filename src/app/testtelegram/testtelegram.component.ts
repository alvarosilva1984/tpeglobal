import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Telegram} from './telegram.model';
import {AuthService} from '../auth/auth.service';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-telegram',
  templateUrl: './testtelegram.component.html',
})

export class TesttelegramComponent implements OnInit {

  telegramForm: FormGroup;
  idresposta = ' ';
  respostadada = ' ';


  constructor(private authService: AuthService) {
  }

  ngOnInit() {


    this.telegramResposta();

    this.telegramForm = new FormGroup({
      message: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required)
    });

  }

  onSubmit() {

    const telegram = new Telegram(
      this.telegramForm.value.message,
      this.telegramForm.value.id,
    );
    this.authService.enviatelegram(telegram)
      .subscribe(
        data => {
          console.log(data);
          alert('Telegram enviado');


        },
        error => {
          console.error(error);
          alert('Ocorreu um erro');
        }
      );


  }


  telegramResposta() {

    this.authService.gettelegramresposta()
      .subscribe(
        data => {
          console.log(data);


        },
        error => console.error(error)
      );
  }

  myId() {
    return this.idresposta;
  }


}
