import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import * as moment from "moment";
import "moment/locale/pt-br";
import {Agenda} from "./agenda.model";
import * as $ from "jquery";

export class Schedule2Component {
  constructor(authService) {
    this.authService = authService;
    this.diaatual = moment.utc();
    this.userselected = [];
    this.dayuser = [];
    this.memousers = [];
    //
    this.pontos = [];
    this.vagas = 0;
    this.vagas2 = 0;
    this.vagas3 = 0;
    this.vagas4 = 0;
    this.code = " ";
    this.feriados = [];
    this.hourVal = " ";
    this.agendas = [];
    this.user_agenda = [];
    this.dia_agenda = [];
    this.horas = [];
    this.pontos_dia = [];
    this.showNow = false;
    this.vagatotaldispo = 0;
    this.valcheckbox = false;
    this.validities = [];
  }

  ngOnInit() {
    this.showNow = false;
    this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
    this.diasemana = moment
      .utc(this.dia)
      .locale("pt-br")
      .format("dddd");
    this.userId = localStorage.getItem("userId");
    this.authService.getpontos().subscribe((pontos) => {
      this.pontos = pontos;
      this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
      this.authService.getFeriado().subscribe((feriados) => {
        this.feriados = feriados;
      });
      this.authService.getHoras().subscribe((horas) => {
        this.horas = horas;
        let horas_sort = this.horas;
        horas_sort.sort((a, b) => {
          if (a.code < b.code)
            return -1;
          if (a.code > b.code)
            return 1;
          return 0;
        });
        this.horas = horas_sort;
        this.authService.getagendas().subscribe((agendas) => {
          this.agendas = agendas;
          this.user_agenda = this.agendas.filter(a => a.userId === this.userId);
          this.authService.getLastValidity().subscribe((validities) => {
            this.validities = validities;
            if (this.validities.length > 0) {
              this.dia = moment.utc(this.validities[0].begin).format("YYYY-MM-DD");
              this.diaatual = moment.utc(this.validities[0].begin);
              this.diasemana = moment.utc(this.dia)
                .locale("pt-br")
                .format("dddd");
            }
          });
          this.vagasDisponiveis();
          this.showNow = true;
        }, error => console.error(error));
      });
    }, error => console.error(error));
  }

  onChange() {
    if (this.validities.length > 0) {
      if (moment.utc(this.dia) > moment.utc(this.validities[0].end) ||
        moment.utc(this.dia) < moment.utc(this.validities[0].begin)) {
        this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
        this.diasemana = moment
          .utc(this.dia)
          .locale("pt-br")
          .format("dddd");
        alert("Período selecionado não está aberto para agendamento!");
        return;
      }
    }
    $('input[type=radio]').prop('checked', false);
    this.hourVal = " ";
    this.code = " ";
    this.vagas = 0;
    this.diasemana = moment
      .utc(this.dia)
      .locale("pt-br")
      .format("dddd");
    this.diaatual = moment.utc(this.dia);
    this.vagasDisponiveis();
    this.valCheck();
  }

  proximoDia(e) {
    if (this.validities.length > 0) {
      if (moment.utc(this.diaatual).add(1, "day") > moment.utc(this.validities[0].end))
        return;
    }
    $('input[type=radio]').prop('checked', false);
    this.hourVal = " ";
    this.code = " ";
    this.vagas = 0;
    this.diaatual = moment.utc(this.diaatual).add(1, "day");
    this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
    this.diasemana = moment
      .utc(this.dia)
      .locale("pt-br")
      .format("dddd");
    this.vagasDisponiveis();
    this.valCheck();
  }

  anteriorDia(e) {
    if (this.validities.length > 0) {
      if (moment.utc(this.diaatual).subtract(1, "day") < moment.utc(this.validities[0].begin))
        return;
    }
    $('input[type=radio]').prop('checked', false);
    this.hourVal = " ";
    this.code = " ";
    this.vagas = 0;
    this.diaatual = moment.utc(this.diaatual).subtract(1, "day");
    this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
    this.diasemana = moment
      .utc(this.dia)
      .locale("pt-br")
      .format("dddd");
    this.vagasDisponiveis();
    this.valCheck();
  }

  execAgendar() {
    let permition = true;
    let mesmodia = [];
    let mesmasemana = [];
    if (this.vagas <= 0)
      permition = false;
    console.log(this.hourVal);
    //verifica agendamento no mesmo dia
    mesmodia = this.user_agenda.filter(a => a.data == moment.utc(this.diaatual).format("YYYY-MM-DD"));
    //encontra primeiro dia da semana
    let primeirodia = moment.utc(this.diaatual).startOf("isoWeek");
    let primeirodia1 = moment.utc(primeirodia).format("YYYY-MM-DD");
    //verifica agendamento em uma mesma semana
    mesmasemana = this.user_agenda.filter(a => {
      let dia1semana = moment.utc(a.data).startOf("isoWeek");
      let dia1formatado = moment.utc(dia1semana).format("YYYY-MM-DD");
      if (dia1formatado == primeirodia1)
        return true;
    });
    if (this.hourVal != " " &&
      permition == true &&
      mesmodia.length < 1 &&
      mesmasemana.length < 1) {
      let dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
      let datashow = moment.utc(this.diaatual).format("DD-MM-YYYY");
      let agenda = new Agenda(dia, datashow, this.hourVal, this.diasemana, this.code);
      agenda.rest = this.vagatotaldispo;
      //this.condition1 = true;
      this.authService.agendamento(agenda).subscribe(data => {
        console.log(data);
        this.authService.getagendas().subscribe((agendas) => {
          this.agendas = agendas;
          this.user_agenda = this.agendas.filter(a => a.userId === this.userId);
          this.vagasDisponiveis();
          alert("Agendado");
        });
      }, error => {
        console.error(error);
        /*           if (error.func == "out") {
                    this.authService.getagendas().subscribe((agendas: Agenda[]) => {
                      this.agendas = agendas;
                      this.user_agenda = this.agendas.filter(
                        a => a.userId === this.userId
                      );
        
                      this.vagasDisponiveis();
                    });
                  } */
      });
    }
    if (this.hourVal == " ") {
      alert("Selecione um horário");
    } else if (permition == false) {
      alert("Não há vagas");
    } else if (mesmodia.length > 0) {
      alert("Não é permitido agendar mais de 1 vez no mesmo dia!");
    } else if (mesmasemana.length > 0) {
      alert("Não é permitido agendar mais de 1 vez na mesma semana!");
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

  /*  onChangecell2(e) {
      //this.condition1 = false;
      this.posicao = 2;
      this.hourVal = "12:00 - 15:00";
   
    }
  
    onChangecell3(e) {
      //this.condition1 = false;
      this.posicao = 3;
      this.hourVal = "15:00 - 18:00";
   
    }
  
    onChangecell4(e) {
      //this.condition1 = false;
      this.posicao = 4;
      this.hourVal = "19:00 - 21:30";
    
    } */

  /*  contaVagas() {
      this.vagas1 = 0;
      this.vagas2 = 0;
      this.vagas3 = 0;
      this.vagas4 = 0;
  
      this.pontos.map((ponto) => {
        this.vagas1 += ponto.npubs;
        this.vagas2 += ponto.npubs;
        this.vagas3 += ponto.npubs;
        this.vagas4 += ponto.npubs;
          for(let i = 0;i< ponto.npubs;i++){
            ponto.pubs.push(i);
          }
    
      });
  
  
  
      this.dia_agenda = this.agendas.filter(
        a => a.data == moment.utc(this.diaatual).format("YYYY-MM-DD"));
      for (let i = 0; i < this.dia_agenda.length; i++) {
  
        if (this.dia_agenda[i].posicao == 1) this.vagas1 -= 1;
        if (this.dia_agenda[i].posicao == 2) this.vagas2 -= 1;
        if (this.dia_agenda[i].posicao == 3) this.vagas3 -= 1;
        if (this.dia_agenda[i].posicao == 4) this.vagas4 -= 1;
  
      }
    } */
  Delete(i) {
    const myagenda = new Agenda(this.user_agenda[i].data, this.user_agenda[i].datashow, this.user_agenda[i].hora, this.user_agenda[i].diasemana, this.user_agenda[i].code, this.user_agenda[i].userId, this.user_agenda[i].agendaId, this.user_agenda[i].sex);
    this.authService.deleteagenda(myagenda).subscribe(result => {
      console.log(result);
      for (let j = 0; j < this.agendas.length; j++) {
        if (this.agendas[j].agendaId === myagenda.agendaId) {
          this.agendas.splice(j, 1);
        }
      }
      this.user_agenda = this.agendas.filter(a => a.userId === this.userId);
      this.vagasDisponiveis();
      /*  this.authService.getagendas()
                  .subscribe(
                  (agendas: Agenda[]) => {
                    this.agendas = agendas;
                    this.user_agenda = agendas;
                    this.user_agenda = this.agendas.filter(
                      a => a.userId === this.userId);
      
                    this.contaVagas();
      
      
                  });  */
    });
  }

  vagasDisponiveis() {
    let day = 0;
    if (this.buscaFeriado())
      day = 7;
    else
      day = this.diaatual.day();
    this.pontos_dia = this.pontos.filter(a => a.config[day].length > 0);
    this.horas.map(b => {
      b.vagas = 0;
      b.dispo = 0;
    });
    this.dia_agenda = this.agendas.filter(a => a.data == moment.utc(this.diaatual).format("YYYY-MM-DD"));
    this.pontos_dia.map(a => {
      for (let i = 0; i < a.config[day].length; i++) {
        this.horas.map(b => {
          if (b.code == a.config[day][i])
            b.vagas += a.npubs;
        });
      }
    });
    console.log(this.horas);
    this.horas.map(b => {
      b.dispo = 0;
      for (let i = 0; i < this.dia_agenda.length; i++) {
        if (this.dia_agenda[i].code == b.code)
          b.dispo += 1;
      }
    });
    console.log(this.horas);
  }

  buscaFeriado() {
    let feriado = this.feriados.filter(a => a.data == this.dia);
    if (feriado.length > 0)
      return true;
    return false;
  }

  disabledAgenda() {
    return this.diaatual.day() == 6 || this.diaatual.day() == 0 || this.validities.length <= 0 || this.buscaFeriado();
  }

  dateString(data) {
    return moment.utc(data).format("DD-MM-YYYY");
  }
}

Schedule2Component.decorators = [
  {
    type: Component, args: [{
      selector: "app-schedule2",
      templateUrl: "./schedule2.component.html",
      styleUrls: ["./schedule2.component.css"]
    },]
  },
];
/** @nocollapse */
Schedule2Component.ctorParameters = () => [
  {type: AuthService,},
];
