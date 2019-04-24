import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import * as moment from 'moment';
import { Memouser } from '../schedule/memouser';
import 'moment/locale/pt-br';
import { Ponto } from '../setup/ponto.model';
import { Agenda } from '../schedule2/agenda.model';
import { Escala } from './escala.model';
import { Hora } from '../setup/hora.model';
import { Congregation } from '../setup/congregation.model';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  diaatual = moment.utc(new Date());
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

  code = '';


  hourVal = '09:00 - 12:00';
  agendas: Agenda[] = [];
  user_agenda: Agenda[] = [];
  userId: string;
  dia_agenda: Agenda[] = [];
  usersdays: Agenda[] = [];
  users: User[];
  vazio = ' ';
  horas: Hora[] = [];
  pontos_dia: Ponto[] = [];
  pontos_hora: Ponto[][] = [];
  minhaclasse: String;

  agendaday: Agenda[] = [];
  agendahour: Agenda[] = [];

  escala1: [number, number, User[]];

  congregations: Congregation[] = [];
    congregation = new Congregation();


  constructor(private authService: AuthService) { }



  ngOnInit() {



    this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
    this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');
    this.userId = localStorage.getItem('userId');

    this.authService.getHoras()
      .subscribe(
        (

          horas: Hora[]) => {
          this.horas = horas;

          const horas_sort = this.horas;
          horas_sort.sort((a, b) => {
            if (a.code < b.code) { return -1; }
            if (a.code > b.code) { return 1; }
            return 0;
          });
          this.horas = horas_sort;






    this.authService.getpontos()
      .subscribe(
        (

          pontos: Ponto[]) => {
          this.pontos = pontos;
          const pontosort = pontos;
                pontosort.sort((a , b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;

                });

                this.pontos = pontosort;
          this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
          console.log('pontos_dia', this.pontos_dia);

          this.authService.getlistusers()
          .subscribe(
            ( users: User[]) => {
                this.users = users;
                const usersort = users;
                usersort.sort((a , b) => {
                    if (a.firstName < b.firstName) { return -1; }
                    if (a.firstName > b.firstName) { return 1; }
                    return 0;

                });

                this.users = usersort;


          this.authService.getagendas()
          .subscribe(
            (agendas: Agenda[]) => {
              this.agendas = agendas;
              this.agendaday = this.agendas.filter(
                a => a.data == moment.utc(this.diaatual).format('YYYY-MM-DD'));
             // let userday_hour = this.agendaday.filter(a=> a.code == hora.code);

             this.authService.getCongregation()
             .subscribe(
             (

                 congregations: Congregation[]) => {
                 this.congregations = congregations;
                 const congsort = this.congregations;
                 congsort.sort((a , b) => {
                     if (a.circuit < b.circuit) { return -1; }
                     if (a.circuit > b.circuit) { return 1; }

                     return 0; });
                 congsort.sort((a , b) => {
                     if (a.circuit == b.circuit) {
                     if (a.nome < b.nome) { return -1; }
                     if (a.nome > b.nome) { return 1; }
                     }
                     return 0; });
                     this.congregations = congsort;


                     this.carregaLayout();

                               });







            },
            error => console.error(error)
          );
              }

          );





        },
        error => console.error(error)
      );



    }

  );





  }

  onChange() {

    this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');
    this.diaatual = moment.utc(this.dia);


    this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);



    this.carregaLayout();


  }

  proximoDia(e: any) {


    this.diaatual = moment.utc(this.diaatual).add(1, 'day');
    this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
    this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');


    this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);


    this.carregaLayout();


  }

  anteriorDia(e: any) {

    this.diaatual = moment.utc(this.diaatual).subtract(1, 'day');
    this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
    this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');

    this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);


    this.carregaLayout();

  }








  carregaAgenda() {

    this.agendaday = this.agendas.filter(
      a => a.data == moment.utc(this.diaatual).format('YYYY-MM-DD'));



  }

  getAge(dateString) {
    const today = new Date();
    console.log(today);
    const birthDate = new Date(dateString);
    console.log(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    console.log(age);
    return age;
  }

  getStyle(sex: string) {

    if (sex == 'M') { return 'blue'; }
    if (sex == 'F') { return '#FF4081'; }

  }



  carregaLayout() {

this.carregaAgenda();

this.pontos_hora = [];

let pontos_hora: Ponto[] = [];
let agendahour: Agenda[] = [];
  this.horas.map(h => {
    h.vagas = 0;

  pontos_hora = [];
  this.pontos_dia.map(a => {
    for (let m = 0; m < a.config[this.diaatual.day()].length; m++) {
      if (a.config[this.diaatual.day()][m] == h.code) {
        const pubs: User[] = [];
        pontos_hora.push( new Ponto(
        a.name,
        a.npubs,
        a.date,
        a.id,
        pubs,
        a.config
      ));
      }
    }


  });

  agendahour = [];
  agendahour = this.agendaday.filter(f => f.code == h.code);




  pontos_hora.map(p => {
    h.vagas = 1;
    p.pubs = [];
    for (let s = 0; s < p.npubs; s++) {
    p.pubs.push(new User());
    }


        for (let s = 0; s < p.npubs; s++) {
          if (agendahour.length > 0) {
        const user = agendahour.splice(0, 1);

        if (user.length > 0) {
        for (let g = 0 ; g < this.users.length; g++) {
          if (user[0].userId == this.users[g].userId) {
            p.pubs[s] = this.users[g];
          }
        }
      }

    }

  }




  });

  this.pontos_hora.push(pontos_hora);




  });





}


identifyCongregation(id) {

  const congregation = this.congregations.filter(a => a.id == id);

  if (congregation.length > 0) {return congregation[0].nome; } else { return ' '; }


}


}


