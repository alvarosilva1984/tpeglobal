import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import * as moment from 'moment';
import {Memouser} from '../schedule/memouser';
import 'moment/locale/pt-br';
import {Ponto} from '../setup/ponto.model';
import {Agenda} from './agenda.model';
import {Hora} from '../setup/hora.model';
import {Validity} from '../setup/validity.model';
import {Vagas} from './vagas.model';
import {Feriado} from '../setup/feriado.model';

declare var $: any;

@Component({
  selector: 'app-schedule2',
  templateUrl: './schedule2.component.html',
  styleUrls: ['./schedule2.component.css']
})
export class Schedule2Component implements OnInit {
  diaatual = moment.utc();
  dia: string;
  diasemana: string;
  user: User;
  usersall: User[];
  totaluser: User[];
  userselected: User[] = [];
  userold: User;
  dayuser: User[] = [];
  memousers: Memouser[] = [];
  memouser: Memouser;

  //
  pontos: Ponto[] = [];
  pubs: number[];
  vagas = 0;
  vagas2 = 0;
  vagas3 = 0;
  vagas4 = 0;
  code = ' ';
  feriados: Feriado[] = [];

  hourVal = ' ';
  agendas: Agenda[] = [];
  user_agenda: Agenda[] = [];
  userId: string;
  dia_agenda: Agenda[] = [];
  horas: Hora[] = [];
  pontos_dia: Ponto[] = [];
  horasdispo: Hora[];
  showNow = false;
  vagatotaldispo = 0;
  valcheckbox = false;
  validities: Validity[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {


    this.showNow = false;
    this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
    this.diasemana = moment
      .utc(this.dia)
      .locale('pt-br')
      .format('dddd');
    this.userId = localStorage.getItem('userId');

    this.authService.getpontos().subscribe(
      (pontos: Ponto[]) => {
        this.pontos = pontos;
        this.pontos_dia = this.pontos.filter(
          a => a.config[this.diaatual.day()].length > 0
        );

        this.authService.getFeriado().subscribe((feriados: Feriado[]) => {
          this.feriados = feriados;
        });

        this.authService.getHoras().subscribe((horas: Hora[]) => {
          this.horas = horas;

          const horas_sort = this.horas;
          horas_sort.sort((a, b) => {
            if (a.code < b.code) {
              return -1;
            }
            if (a.code > b.code) {
              return 1;
            }
            return 0;
          });
          this.horas = horas_sort;

          this.authService.getagendas().subscribe(
            (agendas: Agenda[]) => {
              this.agendas = agendas;
              this.user_agenda = this.agendas.filter(
                a => a.userId == this.userId
              );

              this.authService.getLastValidity().subscribe((validities: Validity[]) => {
                this.validities = validities;
                if (this.validities.length > 0) {
                  this.dia = moment.utc(this.validities[0].begin).format('YYYY-MM-DD');
                  this.diaatual = moment.utc(this.validities[0].begin);
                  this.diasemana = moment.utc(this.dia)
                    .locale('pt-br')
                    .format('dddd');

                }
              });

              this.vagasDisponiveis();
              this.showNow = true;
            },
            error => console.error(error)
          );
        });
      },
      error => console.error(error)
    );
  }

  onChange() {
    if (this.validities.length > 0) {
      if (moment.utc(this.dia) > moment.utc(this.validities[0].end) ||
        moment.utc(this.dia) < moment.utc(this.validities[0].begin)) {
        this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
        this.diasemana = moment
          .utc(this.dia)
          .locale('pt-br')
          .format('dddd');

        alert('Período selecionado não está aberto para agendamento!');
        return;
      }
    }

    $('input[type=radio]').prop('checked', false);
    this.hourVal = ' ';
    this.code = ' ';
    this.vagas = 0;

    this.diasemana = moment
      .utc(this.dia)
      .locale('pt-br')
      .format('dddd');
    this.diaatual = moment.utc(this.dia);

    this.vagasDisponiveis();
    this.valCheck();
  }

  proximoDia(e: any) {
    if (this.validities.length > 0) {
      if (moment.utc(this.diaatual).add(1, 'day') > moment.utc(this.validities[0].end)) {
        return;
      }
    }
    $('input[type=radio]').prop('checked', false);
    this.hourVal = ' ';
    this.code = ' ';
    this.vagas = 0;


    this.diaatual = moment.utc(this.diaatual).add(1, 'day');
    this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
    this.diasemana = moment
      .utc(this.dia)
      .locale('pt-br')
      .format('dddd');

    this.vagasDisponiveis();
    this.valCheck();
  }

  anteriorDia(e: any) {
    if (this.validities.length > 0) {
      if (moment.utc(this.diaatual).subtract(1, 'day') < moment.utc(this.validities[0].begin)) {
        return;
      }
    }

    $('input[type=radio]').prop('checked', false);
    this.hourVal = ' ';
    this.code = ' ';
    this.vagas = 0;

    this.diaatual = moment.utc(this.diaatual).subtract(1, 'day');
    this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
    this.diasemana = moment
      .utc(this.dia)
      .locale('pt-br')
      .format('dddd');

    this.vagasDisponiveis();
    this.valCheck();
  }

  execAgendar() {
    let permition = true;
    let mesmodia: Agenda[] = [];
    let mesmasemana: Agenda[] = [];

    if (this.vagas <= 0) {
      permition = false;
    }

    console.log(this.hourVal);

    // verifica agendamento no mesmo dia
    mesmodia = this.user_agenda.filter(
      a => a.data == moment.utc(this.diaatual).format('YYYY-MM-DD')
    );

    // encontra primeiro dia da semana
    const primeirodia = moment.utc(this.diaatual).startOf('isoWeek');
    const primeirodia1 = moment.utc(primeirodia).format('YYYY-MM-DD');

    // verifica agendamento em uma mesma semana
    mesmasemana = this.user_agenda.filter(a => {
      const dia1semana = moment.utc(a.data).startOf('isoWeek');
      const dia1formatado = moment.utc(dia1semana).format('YYYY-MM-DD');
      if (dia1formatado == primeirodia1) {
        return true;
      }
    });

    if (
      this.hourVal != ' ' &&
      permition == true &&
      mesmodia.length < 1 &&
      mesmasemana.length < 1
    ) {
      const dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
      const datashow = moment.utc(this.diaatual).format('DD-MM-YYYY');
      const agenda = new Agenda(
        dia,
        datashow,
        this.hourVal,
        this.diasemana,
        this.code
      );

      agenda.rest = this.vagatotaldispo;


      this.authService.agendamento(agenda).subscribe(
        data => {
          console.log(data);

          this.authService.getagendas().subscribe((agendas: Agenda[]) => {
            this.agendas = agendas;
            this.user_agenda = this.agendas.filter(
              a => a.userId == this.userId
            );

            this.vagasDisponiveis();
            alert('Agendado');
          });
        },
        error => {
          console.error(error);

        }
      );
    }

    if (this.hourVal == ' ') {
      alert('Selecione um horário');
    } else if (permition == false) {
      alert('Não há vagas');
    } else if (mesmodia.length > 0) {
      alert('Não é permitido agendar mais de 1 vez no mesmo dia!');
    } else if (mesmasemana.length > 0) {
      alert('Não é permitido agendar mais de 1 vez na mesma semana!');
    }
  }

  onChangeSel(e, hora) {
    this.hourVal = hora.hora;
    this.code = hora.code;
    this.vagas = hora.vagas - hora.dispo;
    this.vagatotaldispo = hora.vagas;
    console.log(hora);
  }

  valCheck() {
    return false;
  }

  Delete(i) {
    const myagenda = new Agenda(
      this.user_agenda[i].data,
      this.user_agenda[i].datashow,
      this.user_agenda[i].hora,
      this.user_agenda[i].diasemana,
      this.user_agenda[i].code,
      this.user_agenda[i].userId,
      this.user_agenda[i].agendaId,
      this.user_agenda[i].sex
    );

    this.authService.deleteagenda(myagenda).subscribe(result => {
      console.log(result);
      for (let j = 0; j < this.agendas.length; j++) {
        if (this.agendas[j].agendaId == myagenda.agendaId) {
          this.agendas.splice(j, 1);
        }
      }
      this.user_agenda = this.agendas.filter(a => a.userId == this.userId);

      this.vagasDisponiveis();


    });
  }

  vagasDisponiveis() {
    let day = 0;
    if (this.buscaFeriado()) {
      day = 7;
    } else {
      day = this.diaatual.day();
    }

    this.pontos_dia = this.pontos.filter(a => a.config[day].length > 0);

    this.horas.map(b => {
      b.vagas = 0;
      b.dispo = 0;
    });

    this.dia_agenda = this.agendas.filter(
      a => a.data == moment.utc(this.diaatual).format('YYYY-MM-DD')
    );

    this.pontos_dia.map(a => {
      for (let i = 0; i < a.config[day].length; i++) {
        this.horas.map(b => {
          if (b.code == a.config[day][i]) {
            b.vagas += a.npubs;
          }
        });
      }
    });

    console.log(this.horas);
    this.horas.map(b => {
      b.dispo = 0;
      for (let i = 0; i < this.dia_agenda.length; i++) {
        if (this.dia_agenda[i].code == b.code) {
          b.dispo += 1;
        }
      }
    });

    console.log(this.horas);
  }

  buscaFeriado() {
    const feriado = this.feriados.filter(a => a.data == this.dia);
    if (feriado.length > 0) {
      return true;
    }

    return false;
  }

  disabledAgenda() {
    return this.diaatual.day() == 6 || this.diaatual.day() == 0 || this.validities.length <= 0 || this.buscaFeriado();
  }

  dateString(data: Date) {

    return moment.utc(data).format('DD-MM-YYYY');

  }
}
