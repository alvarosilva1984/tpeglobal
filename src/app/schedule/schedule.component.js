import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Ponto } from "../setup/ponto.model";
import { Congregation } from "../setup/congregation.model";
export class ScheduleComponent {
    constructor(authService) {
        this.authService = authService;
        this.diaatual = moment.utc(new Date());
        this.userselected = [];
        this.dayuser = [];
        this.memousers = [];
        //
        this.pontos = [];
        this.code = "";
        this.hourVal = "09:00 - 12:00";
        this.agendas = [];
        this.user_agenda = [];
        this.dia_agenda = [];
        this.usersdays = [];
        this.vazio = " ";
        this.horas = [];
        this.pontos_dia = [];
        this.pontos_hora = [];
        this.agendaday = [];
        this.agendahour = [];
        this.congregations = [];
        this.congregation = new Congregation();
    }
    ngOnInit() {
        this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
        this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');
        this.userId = localStorage.getItem('userId');
        this.authService.getHoras()
            .subscribe((horas) => {
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
            this.authService.getpontos()
                .subscribe((pontos) => {
                this.pontos = pontos;
                let pontosort = pontos;
                pontosort.sort((a, b) => {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                });
                this.pontos = pontosort;
                this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
                console.log("pontos_dia", this.pontos_dia);
                this.authService.getlistusers()
                    .subscribe((users) => {
                    this.users = users;
                    let usersort = users;
                    usersort.sort((a, b) => {
                        if (a.firstName < b.firstName)
                            return -1;
                        if (a.firstName > b.firstName)
                            return 1;
                        return 0;
                    });
                    this.users = usersort;
                    this.authService.getagendas()
                        .subscribe((agendas) => {
                        this.agendas = agendas;
                        this.agendaday = this.agendas.filter(a => a.data == moment.utc(this.diaatual).format("YYYY-MM-DD"));
                        // let userday_hour = this.agendaday.filter(a=> a.code == hora.code);
                        this.authService.getCongregation()
                            .subscribe((congregations) => {
                            this.congregations = congregations;
                            let congsort = this.congregations;
                            congsort.sort((a, b) => {
                                if (a.circuit < b.circuit)
                                    return -1;
                                if (a.circuit > b.circuit)
                                    return 1;
                                return 0;
                            });
                            congsort.sort((a, b) => {
                                if (a.circuit == b.circuit) {
                                    if (a.nome < b.nome)
                                        return -1;
                                    if (a.nome > b.nome)
                                        return 1;
                                }
                                return 0;
                            });
                            this.congregations = congsort;
                            this.carregaLayout();
                        });
                    }, error => console.error(error));
                });
            }, error => console.error(error));
        });
    }
    onChange() {
        this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');
        this.diaatual = moment.utc(this.dia);
        this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
        this.carregaLayout();
    }
    proximoDia(e) {
        this.diaatual = moment.utc(this.diaatual).add(1, 'day');
        this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
        this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');
        this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
        this.carregaLayout();
    }
    anteriorDia(e) {
        this.diaatual = moment.utc(this.diaatual).subtract(1, 'day');
        this.dia = moment.utc(this.diaatual).format("YYYY-MM-DD");
        this.diasemana = moment.utc(this.dia).locale('pt-br').format('dddd');
        this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
        this.carregaLayout();
    }
    carregaAgenda() {
        this.agendaday = this.agendas.filter(a => a.data == moment.utc(this.diaatual).format("YYYY-MM-DD"));
    }
    getAge(dateString) {
        let today = new Date();
        console.log(today);
        let birthDate = new Date(dateString);
        console.log(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log(age);
        return age;
    }
    getStyle(sex) {
        if (sex == 'M')
            return "blue";
        if (sex == 'F')
            return "#FF4081";
    }
    carregaLayout() {
        this.carregaAgenda();
        this.pontos_hora = [];
        let pontos_hora = [];
        let agendahour = [];
        this.horas.map(h => {
            h.vagas = 0;
            pontos_hora = [];
            this.pontos_dia.map(a => {
                for (let m = 0; m < a.config[this.diaatual.day()].length; m++) {
                    if (a.config[this.diaatual.day()][m] == h.code) {
                        let pubs = [];
                        pontos_hora.push(new Ponto(a.name, a.npubs, a.date, a.id, pubs, a.config));
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
                        let user = agendahour.splice(0, 1);
                        if (user.length > 0) {
                            for (let g = 0; g < this.users.length; g++) {
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
        let congregation = this.congregations.filter(a => a.id == id);
        if (congregation.length > 0)
            return congregation[0].nome;
        else
            return ' ';
    }
}
ScheduleComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-schedule',
                templateUrl: './schedule.component.html',
                styleUrls: ['./schedule.component.css']
            },] },
];
/** @nocollapse */
ScheduleComponent.ctorParameters = () => [
    { type: AuthService, },
];
