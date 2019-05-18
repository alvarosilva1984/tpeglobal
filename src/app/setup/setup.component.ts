import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Ponto} from './ponto.model';
import {Feriado} from './feriado.model';
import {Validity} from './validity.model';
import {Hora} from './hora.model';
import {Circuito} from './circuito.model';
import {Congregation} from './congregation.model';
import {AuthService} from '../auth/auth.service';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import {ErrorService} from '../errors/error.service';
import {Body} from '@angular/http/src/body';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styles: [`

    #npubs {
        width: 70px;
    }

`]
})
export class SetupComponent {
  selectedFile: File;
  circuitoForm: FormGroup;
  congregationForm: FormGroup;
  validityForm: FormGroup;
  pontoForm: FormGroup;
  horaForm: FormGroup;
  feriadoForm: FormGroup;
  pontos: Ponto[] = [];
  mycircuit = new Circuito(' ');
  circuitos: Circuito[] = [];
  validities: Validity[] = [];
  congregations: Congregation[] = [];
  today = moment();
  horas: Hora[] = [];
  dayselect: string = 'Segunda-feira';
  feriados: Feriado[] = [];
  dia = moment.utc().format('YYYY-MM-DD');
  diasdasemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo', 'Feriado'];
  diadasemana = 0;
  begin: Date;
  end: Date;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {

    const pontos = new Ponto(this.pontoForm.value.name,
      this.pontoForm.value.npubs,
      moment.utc(this.today).format('YYYY-MM-DD')
    );
    this.authService.pontocreate(pontos)
      .subscribe(
        data => {
          console.log(data);
          this.authService.getpontos()
            .subscribe(
              (
                pontos: Ponto[]) => {
                this.pontos = pontos;


              }
            );


        },
        error => console.error(error)
      );


    this.pontoForm.reset();


  }

  onSubmit2() {

    const hora = new Hora(
      this.horaForm.value.code,
      this.horaForm.value.hora,
    );


    this.authService.horaCreate(hora)
      .subscribe(
        data => {
          console.log(data);
          this.horaForm.reset();
          this.authService.getHoras()
            .subscribe(
              (
                horas: Hora[]) => {
                this.horas = horas;
                let horas_sort = this.horas;
                horas_sort.sort((a, b) => {
                  if (a.code < b.code) return -1;
                  if (a.code > b.code) return 1;
                  return 0;
                });
                this.horas = horas_sort;


              }
            );


        },
        error => console.error(error)
      );


  }

  onSubmit3() {

    let dia = moment.utc(this.feriadoForm.value.data).format('YYYY-MM-DD');
    let datashow = moment.utc(this.feriadoForm.value.data).format('DD-MM-YYYY');
    const feriado = new Feriado(
      this.feriadoForm.value.feriado,
      dia,
      datashow,
    );


    this.authService.feriadoCreate(feriado)
      .subscribe(
        data => {
          console.log(data);
          this.feriadoForm.reset();


          this.authService.getFeriado()
            .subscribe(
              (
                feriados: Feriado[]) => {
                this.feriados = feriados;

              }
            );


        },
        error => console.error(error)
      );


  }

  onSubmit4() {

    const feriado = new Circuito(
      this.circuitoForm.value.nome
    );


    this.authService.circuitoCreate(feriado)
      .subscribe(
        data => {
          console.log(data);
          this.circuitoForm.reset();


          this.authService.getCircuito()
            .subscribe(
              (
                circuitos: Circuito[]) => {
                this.circuitos = circuitos;

              }
            );


        },
        error => console.error(error)
      );


  }

  onSubmit5() {

    console.log('mycircuit', this.mycircuit, this.mycircuit.nome);

    const congregation = new Congregation(
      this.congregationForm.value.nome,
      this.mycircuit.nome
    );


    this.authService.congregationCreate(congregation)
      .subscribe(
        data => {
          console.log(data);
          this.congregationForm.reset();


          this.authService.getCongregation()
            .subscribe(
              (
                congregations: Congregation[]) => {
                this.congregations = congregations;
                let congsort = this.congregations;
                congsort.sort((a, b) => {
                  if (a.circuit < b.circuit) return -1;
                  if (a.circuit > b.circuit) return 1;

                  return 0;
                });
                congsort.sort((a, b) => {
                  if (a.circuit == b.circuit) {
                    if (a.nome < b.nome) return -1;
                    if (a.nome > b.nome) return 1;
                  }
                  return 0;
                });
                this.congregations = congsort;

              }
            );


        },
        error => console.error(error)
      );


  }


  onSubmit6() {


    const validity = new Validity(
      this.validityForm.value.begin,
      this.validityForm.value.end
    );


    this.authService.validityCreate(validity)
      .subscribe(
        data => {
          console.log(data);
          this.validityForm.reset();


          this.authService.getValidity()
            .subscribe(
              (
                validities: Validity[]) => {
                this.validities = validities;


              }
            );


        },
        error => console.error(error)
      );


  }

  ngOnInit() {


    this.pontoForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      npubs: new FormControl(null, Validators.required)
    });


    this.horaForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required)
    });

    this.feriadoForm = new FormGroup({
      feriado: new FormControl(null, Validators.required),
      data: new FormControl(null, Validators.required)
    });

    this.circuitoForm = new FormGroup({
      nome: new FormControl(null, Validators.required)
    });


    this.congregationForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      circuit: new FormControl(null, Validators.required)
    });

    this.validityForm = new FormGroup({
      begin: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required)
    });

    this.authService.getValidity()
      .subscribe(
        (
          validities: Validity[]) => {
          this.validities = validities;
        }
      );

    this.authService.getpontos()
      .subscribe(
        (
          pontos: Ponto[]) => {
          this.pontos = pontos;
        }
      );


    this.authService.getHoras()
      .subscribe(
        (
          horas: Hora[]) => {
          this.horas = horas;

          let horas_sort = this.horas;
          horas_sort.sort((a, b) => {
            if (a.code < b.code) return -1;
            if (a.code > b.code) return 1;
            return 0;
          });
          this.horas = horas_sort;


        }
      );

    this.authService.getFeriado()
      .subscribe(
        (
          feriados: Feriado[]) => {
          this.feriados = feriados;
        });

    this.authService.getCircuito()
      .subscribe(
        (
          circuitos: Circuito[]) => {
          this.circuitos = circuitos;
        });


    this.authService.getCongregation()
      .subscribe(
        (
          congregations: Congregation[]) => {
          this.congregations = congregations;
          let congsort = this.congregations;
          congsort.sort((a, b) => {
            if (a.circuit < b.circuit) return -1;
            if (a.circuit > b.circuit) return 1;

            return 0;
          });
          congsort.sort((a, b) => {
            if (a.circuit == b.circuit) {
              if (a.nome < b.nome) return -1;
              if (a.nome > b.nome) return 1;
            }
            return 0;
          });
          this.congregations = congsort;
        });

  }

  Delete(i) {

    console.log('atencao');
    console.log(this.pontos[i]);
    const myponto = new Ponto(
      this.pontos[i].name,
      this.pontos[i].npubs,
      this.pontos[i].date,
      this.pontos[i].id
    );


    this.authService.deleteponto(myponto)
      .subscribe(
        result => {
          console.log(result);
          this.pontos.splice(i, 1);
        }
      );


  }


  Delete2(i) {
    let ponto_com_hora: Ponto[] = [];

    ponto_com_hora = this.pontos.filter(a => {

      for (let j = 0; j < a.config.length; j++) {

        for (let m = 0; m < a.config[j].length; m++) {

          if (a.config[j][m] == this.horas[i].code) return true;
        }
      }
    });
    console.log('ponto_com_hora', ponto_com_hora);
    if (ponto_com_hora.length <= 0) {
      console.log('atencao');
      console.log(this.horas[i]);
      const myhora = new Hora(
        this.horas[i].code,
        this.horas[i].hora,
        this.horas[i].idhora,
      );


      this.authService.deletehora(myhora)
        .subscribe(
          result => {
            console.log(result);
            this.horas.splice(i, 1);
          }
        );

    } else {

      alert('Existem pontos com este Horário, retire os flags dos pontos para que o horário possa ser deletado.');

    }

  }

  changed(e: any, ponto: Ponto, hora: Hora) {

    console.log(e);
    if (e == true) {
      if (this.dayselect == 'Segunda-feira') ponto.config[1].push(hora.code);
      if (this.dayselect == 'Terça-feira') ponto.config[2].push(hora.code);
      if (this.dayselect == 'Quarta-feira') ponto.config[3].push(hora.code);
      if (this.dayselect == 'Quinta-feira') ponto.config[4].push(hora.code);
      if (this.dayselect == 'Sexta-feira') ponto.config[5].push(hora.code);
      if (this.dayselect == 'Sábado') ponto.config[6].push(hora.code);
      if (this.dayselect == 'Domingo') ponto.config[0].push(hora.code);
      if (this.dayselect == 'Feriado') ponto.config[7].push(hora.code);
    } else {
      if (this.dayselect == 'Segunda-feira') ponto.config[1].splice(ponto.config[1].indexOf(hora.code), 1);
      if (this.dayselect == 'Terça-feira') ponto.config[2].splice(ponto.config[2].indexOf(hora.code), 1);
      if (this.dayselect == 'Quarta-feira') ponto.config[3].splice(ponto.config[3].indexOf(hora.code), 1);
      if (this.dayselect == 'Quinta-feira') ponto.config[4].splice(ponto.config[4].indexOf(hora.code), 1);
      if (this.dayselect == 'Sexta-feira') ponto.config[5].splice(ponto.config[5].indexOf(hora.code), 1);
      if (this.dayselect == 'Sábado') ponto.config[6].splice(ponto.config[6].indexOf(hora.code), 1);
      if (this.dayselect == 'Domingo') ponto.config[0].splice(ponto.config[0].indexOf(hora.code), 1);
      if (this.dayselect == 'Feriado') ponto.config[8].splice(ponto.config[8].indexOf(hora.code), 1);

    }
    console.log(ponto);
    console.log(this.pontos);


  }

  salvarConfig() {

    this.authService.pontoUpdate(this.pontos)
      .subscribe(
        data => {
          console.log(data);
          alert('Os dados dos pontos foram atualizados!');
          this.authService.getpontos()
            .subscribe(
              (
                pontos: Ponto[]) => {
                this.pontos = pontos;
              }
            );
        },
        error => console.error(error)
      );

  }

  valorCheck(ponto: Ponto, hora: Hora) {
    console.log(ponto.config[2].filter(a => (a == hora.code)), this.dayselect);
    let existe = [];
    if (this.dayselect == 'Segunda-feira') {
      existe = ponto.config[1].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Terça-feira') {
      existe = ponto.config[2].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Quarta-feira') {
      existe = ponto.config[3].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Quinta-feira') {
      existe = ponto.config[4].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Sexta-feira') {
      existe = ponto.config[5].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Sábado') {
      existe = ponto.config[6].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Domingo') {
      existe = ponto.config[0].filter(a => a == hora.code);
    }
    if (this.dayselect == 'Feriado') {
      existe = ponto.config[7].filter(a => a == hora.code);
    }

    if (existe.length > 0) return true;

    return false;

  }


  Delete3(i) {

    console.log('atencao');
    console.log(this.feriados[i]);
    const myferiado = new Feriado(
      this.feriados[i].feriado,
      this.feriados[i].data,
      this.feriados[i].datashow,
      this.feriados[i].idferiado,
    );


    this.authService.deleteFeriado(myferiado)
      .subscribe(result => console.log(result)
      );

    this.feriados.splice(i, 1);
  }

  anteriorDia(e) {

    this.diadasemana -= 1;
    if (this.diadasemana < 0) this.diadasemana = 7;
    this.dayselect = this.diasdasemana[this.diadasemana];

  }

  proximoDia(e) {

    this.diadasemana += 1;
    if (this.diadasemana > 7) this.diadasemana = 0;
    this.dayselect = this.diasdasemana[this.diadasemana];


  }

  Delete4(i) {

    console.log('atencao');
    console.log(this.circuitos[i]);
    const mycircuito = new Circuito(
      this.circuitos[i].nome,
      this.circuitos[i].id
    );


    this.authService.deletecircuito(mycircuito)
      .subscribe(result => console.log(result)
      );

    this.circuitos.splice(i, 1);
  }

  Delete5(i) {

    console.log('atencao');
    console.log(this.congregations[i]);
    const mycongregation = new Congregation(
      this.congregations[i].nome,
      this.congregations[i].circuit,
      this.congregations[i].id
    );


    this.authService.deletecongregation(mycongregation)
      .subscribe(result => console.log(result)
      );

    this.congregations.splice(i, 1);
  }


  Delete6(i) {

    console.log('atencao');
    console.log(this.validities[i]);
    const myvalidity = new Validity(
      this.validities[i].begin,
      this.validities[i].end,
      this.validities[i].status,
      this.validities[i].id
    );


    this.authService.deletevalidity(myvalidity)
      .subscribe(result => console.log(result)
      );

    this.validities.splice(i, 1);
  }


  dateString(data: Date) {

    return moment.utc(data).format('DD-MM-YYYY');

  }


}



