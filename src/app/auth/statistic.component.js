import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
export class StatisticComponent {
    constructor(statisticService, router) {
        this.statisticService = statisticService;
        this.router = router;
        this.totalpub = 0;
        this.totalman = 0;
        this.totalwoman = 0;
        this.totalapprove = 0;
        this.porcentwoman = " ";
        this.porcentval = 0;
        this.mediaidade = 0;
        this.maisvelho = 0;
        this.maisnovo = 900000;
        this.totalidade = 0;
        this.segunda = 0;
        this.terca = 0;
        this.quarta = 0;
        this.quinta = 0;
        this.sexta = 0;
        this.sabado = 0;
        this.domingo = 0;
        this.dispo = 0;
        this.horas = [];
        this.pontos_dia = [];
        this.pontos = [];
        this.congregations = [];
        this.circuitos = [];
        this.dayselect = 'Segunda-feira';
        this.diasdasemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
        this.totalsegunda = 0;
        this.totalterca = 0;
        this.totalquarta = 0;
        this.totalquinta = 0;
        this.totalsexta = 0;
        this.totalsabado = 0;
        this.totaldomingo = 0;
        this.countcirc = 0;
        this.countcong = 0;
        this.semdispo = 0;
        this.semdispoarray = [];
        this.circcong = [];
        this.showNow = false;
    }
    ngOnInit() {
        this.totalsegunda = 0;
        this.totalterca = 0;
        this.totalquarta = 0;
        this.totalquinta = 0;
        this.totalsexta = 0;
        this.totalsabado = 0;
        this.totaldomingo = 0;
        this.countcirc = 0;
        this.countcong = 0;
        this.semdispo = 0;
        this.semdispoarray = [];
        this.circcong = [];
        this.statisticService.getAllCircuito()
            .subscribe((circuitos) => {
            this.circuitos = circuitos;
            this.statisticService.getAllCongregation()
                .subscribe((congregations) => {
                this.congregations = congregations;
                let congsort = this.congregations;
                /*            congsort.sort((a, b) => {
                                  if (a.circuit < b.circuit) return -1;
                                  if (a.circuit > b.circuit) return 1;
                
                                  return 0;
                                }); */
                congsort.sort((a, b) => {
                    if (a.nome < b.nome)
                        return -1;
                    if (a.nome > b.nome)
                        return 1;
                    return 0;
                });
                this.congregations = congsort;
                this.statisticService.getpontos()
                    .subscribe((pontos) => {
                    this.pontos = pontos;
                    this.pontos_dia = this.pontos.filter(a => a.config[1].length > 0);
                    this.statisticService.getHoras()
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
                        this.statisticService.getlistAllUsers()
                            .subscribe((users) => {
                            //this.users = users.filter(a => a.email != "super@super.com");
                            this.users = users;
                            this.totalpub = this.users.length;
                            console.log("totalpub", this.totalpub, this.users.length);
                            let totalidade = 0;
                            for (let i = 0; i < this.users.length; i++) {
                                if (this.users[i].sex == 'F') {
                                    this.totalwoman++;
                                }
                                if (this.users[i].sex == 'M') {
                                    this.totalman++;
                                }
                                let idade = this.getAge(this.users[i].datebirth);
                                if (idade > this.maisvelho)
                                    this.maisvelho = idade;
                                if (idade < this.maisnovo)
                                    this.maisnovo = idade;
                                totalidade += idade;
                                if (this.users[i].released) {
                                    this.totalapprove++;
                                }
                                let comcirc = false;
                                let indexcirc = 0;
                                for (let x = 0; x < this.circcong.length; x++) {
                                    if (this.circcong[x].circ == this.users[i].circuito) {
                                        comcirc = true;
                                        indexcirc = x;
                                        break;
                                    }
                                }
                                if (!comcirc) {
                                    let newcirc = { circ: this.users[i].circuito, cong: [], countcirc: 0 };
                                    newcirc.countcirc++;
                                    newcirc.cong.push(this.users[i].congregation);
                                    this.circcong.push(newcirc);
                                    this.countcirc++;
                                    this.countcong++;
                                }
                                else {
                                    let comcong = false;
                                    for (let t = 0; t < this.circcong[indexcirc].cong.length; t++) {
                                        if (this.circcong[indexcirc].cong[t] == this.users[i].congregation) {
                                            this.circcong[indexcirc].countcirc++;
                                            comcong = true;
                                            break;
                                        }
                                    }
                                    if (!comcong) {
                                        this.circcong[indexcirc].cong.push(this.users[i].congregation);
                                        this.countcong++;
                                        this.circcong[indexcirc].countcirc++;
                                    }
                                }
                                let nodispo = 0;
                                for (let j = 0; j < this.users[i].config.length; j++) {
                                    if (this.users[i].config[j].length > 0) {
                                        if (j == 0)
                                            this.domingo++;
                                        if (j == 1)
                                            this.segunda++;
                                        if (j == 2)
                                            this.terca++;
                                        if (j == 3)
                                            this.quarta++;
                                        if (j == 4)
                                            this.quinta++;
                                        if (j == 5)
                                            this.sexta++;
                                        if (j == 6)
                                            this.sabado++;
                                        nodispo++;
                                    }
                                }
                                if (nodispo == 0) {
                                    this.semdispo++;
                                    this.semdispoarray.push(this.users[i]);
                                }
                            }
                            this.mediaidade = totalidade / this.totalpub;
                            this.showNow = true;
                        });
                    });
                });
            });
        });
    }
    percentwomanfunc(porcentwoman) {
        return porcentwoman;
    }
    getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    horasExistentes(diasemana) {
        let day = 1;
        this.dayselect = diasemana;
        if (this.dayselect == 'Segunda-feira') {
            this.totalsegunda = 0;
            day = 1;
        }
        if (this.dayselect == 'Terça-feira') {
            this.totalterca = 0;
            day = 2;
        }
        if (this.dayselect == 'Quarta-feira') {
            this.totalquarta = 0;
            day = 3;
        }
        if (this.dayselect == 'Quinta-feira') {
            this.totalquinta = 0;
            day = 4;
        }
        if (this.dayselect == 'Sexta-feira') {
            this.totalsexta = 0;
            day = 5;
        }
        if (this.dayselect == 'Sábado') {
            this.totalsabado = 0;
            day = 6;
        }
        if (this.dayselect == 'Domingo') {
            this.totaldomingo = 0;
            day = 0;
        }
        this.pontos_dia = this.pontos.filter(a => a.config[day].length > 0);
        this.horas.map(b => { b.vagas = 0; b.dispo = 0; });
        this.pontos_dia.map(a => {
            for (let i = 0; i < a.config[day].length; i++) {
                this.horas.map(b => {
                    if (b.code == a.config[day][i]) {
                        b.vagas += a.npubs;
                        if (day == 1)
                            this.totalsegunda += a.npubs;
                        if (day == 2)
                            this.totalterca += a.npubs;
                        if (day == 3)
                            this.totalquarta += a.npubs;
                        if (day == 4)
                            this.totalquinta += a.npubs;
                        if (day == 5)
                            this.totalsexta += a.npubs;
                        if (day == 6)
                            this.totalsabado += a.npubs;
                        if (day == 0)
                            this.totaldomingo += a.npubs;
                    }
                });
            }
        });
        return true;
    }
    countUser(code, diasemana) {
        let day = 1;
        if (diasemana == 'Segunda-feira')
            day = 1;
        if (diasemana == 'Terça-feira')
            day = 2;
        if (diasemana == 'Quarta-feira')
            day = 3;
        if (diasemana == 'Quinta-feira')
            day = 4;
        if (diasemana == 'Sexta-feira')
            day = 5;
        if (diasemana == 'Sábado')
            day = 6;
        if (diasemana == 'Domingo')
            day = 0;
        let count = 0;
        this.users.map(a => {
            let config = [];
            config = a.config;
            for (let i = 0; i < config[day].length; i++) {
                if (config[day][i].hora == code)
                    count++;
            }
        });
        return count;
    }
    encontraCongregacao(id) {
        let congregation = this.congregations.filter(a => a.id == id);
        if (congregation.length > 0)
            return congregation[0].nome;
        else
            return " ";
    }
    encontraCircuito(id) {
        let circuit = this.circuitos.filter(a => a.id == id);
        if (circuit.length > 0)
            return circuit[0].nome;
        else
            return " ";
    }
    countCong(cong) {
        let users = this.users.filter(a => a.congregation == cong);
        return users.length;
    }
}
StatisticComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-statistic',
                templateUrl: './statistic.component.html',
                styles: [`

  .center{
    text-align: center
  }

    `]
            },] },
];
/** @nocollapse */
StatisticComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: Router, },
];
