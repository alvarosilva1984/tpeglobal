import {SigninComponent} from './../auth/signin.component';
import {Congregation} from './../setup/congregation.model';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {Ponto} from '../setup/ponto.model';
import {Especial} from '../setup/especial.model';
import {Agenda} from '../schedule2/agenda.model';
import {Hora} from '../setup/hora.model';
import {Circuito} from '../setup/circuito.model';
import {Validity} from '../setup/validity.model';
import * as io from 'socket.io-client';
import {Feriado} from '../setup/feriado.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './newschedule.component.html',
  styleUrls: ['./newschedule.component.css']
})
export class NewscheduleComponent implements OnInit {
  congregations: Congregation[] = [];
  circuitos: Circuito[] = [];
  horas: Hora[] = [];

  pontos_dia: Ponto[] = [];
  pontos_hora = [];
  pontos: Ponto[] = [];

  user: User;
  usersall: User[];
  totaluser: User[];
  userselected: User[] = [];
  users: User[];
  usersesc: User[] = [];

  agendas: Agenda[] = [];
  user_agenda: Agenda[] = [];
  userId: string;
  dia_agenda: Agenda[] = [];
  agendaday: Agenda[] = [];

  diaatual = moment.utc(new Date());
  dia: string;
  diasemana: string;

  validities: Validity[] = [];
  validity: Validity;

  escala = [];

  datainicio: String = ' ';
  datafim: String = ' ';

  showNow = false;
  allowsave = false;
  allowdelete = false;

  mesmodia = [];
  mesmasemana = [];
  mesmasemana_agenda = [];
  reportcount = [];
  reportvoid = 0;
  finalreport = [];
  muda = true;
  display = 'none';
  displaymail = 'none';
  telegramreport = [];
  emailreport = [];
  escala_temp = [];
  especiais = [];
  feriados: Feriado[] = [];
  dayoption = 0;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.showNow = false;

    this.mesmodia = [];
    this.mesmasemana = [];

    this.initSocket();

    this.authService.getCircuito().subscribe((circuitos: Circuito[]) => {
      this.circuitos = circuitos;
    });

    this.authService.getValidity().subscribe((validities: Validity[]) => {
      this.validities = validities.filter(a => {
        if (a.status == true) {
          return true;
        }
      });

      const validitiessort = this.validities;
      validitiessort.sort((a, b) => {
        if (a.begin > b.begin) {
          return -1;
        }
        if (a.begin < b.begin) {
          return 1;
        }
        return 0;
      });
      this.validities = validitiessort;
      this.validity = this.validities[0] || {};
      this.datainicio = this.dateString(this.validity.begin);
      this.datafim = this.dateString(this.validity.end);
    });

    this.authService.getFeriado().subscribe((feriados: Feriado[]) => {
      this.feriados = feriados;
    });

    this.authService.getHoras().subscribe((horas: Hora[]) => {
      this.horas = horas;

      const horas_sort = this.horas;
      horas_sort.sort((a, b) => {
        if (a.code > b.code) {
          return -1;
        }
        if (a.code < b.code) {
          return 1;
        }
        return 0;
      });
      this.horas = horas_sort;

      this.authService.getpontos().subscribe(
        (pontos: Ponto[]) => {
          this.pontos = pontos;
          const pontosort = pontos;
          pontosort.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          this.pontos = pontosort;
          // this.pontos_dia = this.pontos.filter(a => a.config[this.diaatual.day()].length > 0);
          // console.log("pontos_dia", this.pontos_dia);

          this.authService.getlistusers_esc().subscribe((users: User[]) => {
            // this.users = users.filter(a => a.email != 'super@super.com');
            this.users = users;
            const usersort = this.users;

            for (let i = 0; i < usersort.length - 1; i++) {
              const j = i + Math.floor(Math.random() * (usersort.length - i));

              const temp = usersort[j];
              usersort[j] = usersort[i];
              usersort[i] = temp;
            }

            usersort.sort(function (a, b) {
              return a.lastday > b.lastday ? 1 : a.lastday < b.lastday ? -1 : 0;
            });

            this.users = usersort;

            this.authService.getagendas().subscribe(
              (agendas: Agenda[]) => {
                this.agendas = agendas;
                // this.agendaday = this.agendas.filter(
                // a => a.data == moment.utc(this.diaatual).format("YYYY-MM-DD"));
                // let userday_hour = this.agendaday.filter(a=> a.code == hora.code);

                this.authService
                  .getCongregation()
                  .subscribe((congregations: Congregation[]) => {
                    this.congregations = congregations;
                    const congsort = this.congregations;
                    congsort.sort((a, b) => {
                      if (a.circuit < b.circuit) {
                        return -1;
                      }
                      if (a.circuit > b.circuit) {
                        return 1;
                      }

                      return 0;
                    });
                    congsort.sort((a, b) => {
                      if (a.circuit == b.circuit) {
                        if (a.nome < b.nome) {
                          return -1;
                        }
                        if (a.nome > b.nome) {
                          return 1;
                        }
                      }
                      return 0;
                    });
                    this.congregations = congsort;

                    this.authService.getespecial().subscribe(
                      (especiais: Especial[]) => {
                        this.especiais = especiais;

                        this.getEscala();
                      },
                      error => console.error(error)
                    );
                  });
              },
              error => console.error(error)
            );
          });
        },
        error => console.error(error)
      );
    });
  }


  carregaAgenda() {
    this.agendaday = this.agendas.filter(
      a => a.data == moment.utc(this.diaatual).format('YYYY-MM-DD')
    );
  }

  getAge(dateString) {
    const today = new Date();

    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m == 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  getStyle(sex: string) {
    if (sex == 'M') {
      return 'blue';
    }
    if (sex == 'F') {
      return '#FF4081';
    }
  }

  carregaLayout() {
    const datamoment = moment.utc(this.diaatual).format('DD-MM-YYYY');
    const diasemana = moment
      .utc(this.diaatual)
      .locale('pt-br')
      .format('dddd');
    const ano = this.diaatual.year();
    const mes = this.diaatual.month();
    const diadia = this.diaatual.date();
    const escala = {
      dia: datamoment,
      diasemana: diasemana,
      datainicio: this.datainicio,
      datafim: this.datafim,
      data: new Date(Date.UTC(ano, mes, diadia, 3, 0, 0)),
      hora: [],
      pontos: []
    };

    this.carregaAgenda();

    this.pontos_hora = [];

    let pontos_hora: Ponto[] = [];
    let agendahour: Agenda[] = [];

    this.mesmodia = [];
    let especial = [];

    especial = this.especiais.filter(a => {

      const x = new Date(a.begin);
      const y = new Date(a.end);
      const z = escala.data;

      return ((+z >= +x) && (+z <= +y));

    });


    this.horas.map(h => {
      h.vagas = 0;


      pontos_hora = [];
      this.pontos_dia.map(a => {
        for (let m = 0; m < a.config[this.dayoption].length; m++) {
          if (a.config[this.dayoption][m] == h.code) {
            const pubs: User[] = [];
            const config = a.config;
            pontos_hora.push(
              new Ponto(
                a.name,
                a.npubs,
                a.date,
                a.id,
                pubs,
                config,
                a.address,
                a.obs,
                a.fileimg
              )
            );
          }
        }
      });

      agendahour = [];
      agendahour = this.agendaday.filter(f => f.code == h.code);

      for (let i = 0; i < pontos_hora.length - 1; i++) {
        const j = i + Math.floor(Math.random() * (pontos_hora.length - i));

        const temp = pontos_hora[j];
        pontos_hora[j] = pontos_hora[i];
        pontos_hora[i] = temp;
      }

      // carrega agenda
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
              // usuarios agendados
              for (let g = 0; g < this.usersesc.length; g++) {
                // inicio do controle de dias especiais(congressos, assembleias)
                if (especial.length > 0) {
                  let match = false;
                  for (let b = 0; b < especial.length; b++) {
                    if (especial[b].circuito == 'TODOS') {
                      console.log(`TODOS ${especial[b]}`);
                    }
                    if (
                      especial[b].circuito ==
                      this.usersesc[g].congregation['circuit'] ||
                      especial[b].circuito == 'TODOS'
                    ) {
                      match = true;
                      break;
                    }
                  }
                  if (match) {
                    continue;
                  }
                }
                // fim do controle de dias especiais

                if (user[0].userId == this.usersesc[g].userId) {
                  // corrige agenda se não estiver na sequencia irmãos e irmãs
                  if (s > 0) {
                    if (p.pubs[s - 1].sex != this.usersesc[g].sex) {
                      agendahour.push(user[0]);
                      continue;
                    }
                  }

                  const newuser = this.makeNewUser(this.usersesc[g]);
                  newuser.tipoesc = 'A';
                  p.pubs[s] = newuser;

                  const userh = this.usersesc.splice(g, 1);
                  // userh[0].lastday = new Date(this.dia);
                  this.usersesc.push(userh[0]);

                  this.mesmodia.push(this.usersesc[g].userId);

                  // encontra primeiro dia da semana
                  const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                  const dia1formatado = moment
                    .utc(dia1semana)
                    .format('YYYY-MM-DD');
                  const mesmasemana = {
                    dia: dia1formatado,
                    id: this.usersesc[g].userId
                  };
                  this.mesmasemana.unshift(mesmasemana);
                }
              }
            }
          }
        }
      });

      // carrega usuarios com disponibilidade

      pontos_hora.map(p => {
        let contador = 0;
        while (contador < 10) {
          contador += 1;
          for (let s = 0; s < p.npubs; s++) {
            if (p.pubs[s].userId == undefined) {
              // usuarios disponibilidade
              for (let g = 0; g < this.usersesc.length; g++) {

                // inicio do controle de dias especiais(congressos, assembleias)
                if (especial.length > 0) {
                  let match = false;
                  for (let b = 0; b < especial.length; b++) {
                    if (
                      especial[b].circuito ==
                      this.usersesc[g].congregation['circuit'] ||
                      especial[b].circuito == 'TODOS'
                    ) {
                      match = true;
                      break;
                    }
                  }
                  if (match) {
                    continue;
                  }
                }
                // fim do controle de dias especiais


                // nao deixa de menor de 17 sem responsavel(companheiro pai)

                const idade = this.getAge(this.usersesc[g].datebirth);
                if (contador > 1 && idade == 17) {
                  continue;

                }

                if (contador > 1 && this.usersesc[g].conjuge) {
                  continue;

                }
                let idade2 = null;
                if (s > 0) {

                  idade2 = this.getAge(p.pubs[s - 1].datebirth);
                }

                if (s > 0 && idade2 < 18 && idade < 18) {
                  continue;
                }
                if (this.usersesc[g].conjuge == null && idade < 17) {

                  continue;
                }

                if (s > 0 && idade == 17) {
                  if (p.pubs[s - 1].userId == undefined) {
                    continue;
                  }
                  try {
                    if (p.pubs[s - 1].congregation['nome'] != this.usersesc[g].congregation['nome']) {
                      continue;
                    }


                  } catch (e) {

                    console.log(e);


                  }

                }

                if (s > 0 && idade2 == 17 && idade >= 18) {

                  if (p.pubs[s - 1].congregation['nome'] != this.usersesc[g].congregation['nome']) {
                    continue;
                  }


                }
                // usuario agendado na semana nao eh designado
                let semanaigualpre = false;
                const dia1semanapre = moment.utc(this.dia).startOf('isoWeek');
                const dia1formatadopre = moment
                  .utc(dia1semanapre)
                  .format('YYYY-MM-DD');
                for (let m = 0; m < this.mesmasemana_agenda.length; m++) {
                  if (
                    this.mesmasemana_agenda[m].id == this.usersesc[g].userId &&
                    this.mesmasemana_agenda[m].dia == dia1formatadopre
                  ) {
                    semanaigualpre = true;
                    break;
                  }
                }
                if (semanaigualpre) {
                  continue;
                }


                // mantem irmãos juntos e irmãs juntas, e casais juntos

                if (s > 0) {
                  if (p.pubs[s - 1].conjuge == null && this.usersesc[g].conjuge) {
                    continue;
                  }
                  if (
                    p.pubs[s - 1].conjuge &&
                    p.pubs[s - 1].tipoesc != 'A' &&
                    this.usersesc[g].conjuge == null
                  ) {
                    continue;
                  }

                  let casal = false;
                  if (p.pubs[s - 1].conjuge && this.usersesc[g].conjuge) {
                    if (
                      p.pubs[s - 1].userId == this.usersesc[g].conjuge &&
                      p.pubs[s - 1].conjuge == this.usersesc[g].userId
                    ) {
                      casal = true;
                    } else {
                      continue;
                    }
                  }


                  if (casal == false && p.pubs[s - 1].sex != this.usersesc[g].sex) {
                    continue;
                  }
                }


                // controla se existem usuários designados no mesmo dia
                let diaigual = false;
                for (let mdia = 0; mdia < this.mesmodia.length; mdia++) {
                  if (this.usersesc[g].userId == this.mesmodia[mdia]) {
                    diaigual = true;
                    break;
                  }
                }
                if (diaigual) {
                  continue;
                }

                // controla se existem usuários designados na mesma semana
                let semanaigual = false;
                // encontra primeiro dia da semana
                const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                const dia1formatado = moment.utc(dia1semana).format('YYYY-MM-DD');
                for (let msem = 0; msem < this.mesmasemana.length; msem++) {
                  if (
                    this.mesmasemana[msem].id == this.usersesc[g].userId &&
                    this.mesmasemana[msem].dia == dia1formatado
                  ) {
                    semanaigual = true;
                    break;
                  }
                }
                if (semanaigual) {
                  continue;
                }

                let config = [];
                config = this.usersesc[g].config;

                let achei = false;
                let dayoptionuser = this.dayoption;

                if (dayoptionuser == 7) {
                  dayoptionuser = 0;
                }
                for (let i = 0; i < config[dayoptionuser].length; i++) {
                  if (config[dayoptionuser][i].hora == h.code) {
                    const newuser = this.makeNewUser(this.usersesc[g]);
                    newuser.tipoesc = 'E';
                    p.pubs[s] = newuser;
                    const userh = this.usersesc.splice(g, 1);
                    // userh[0].lastday = new Date(this.dia);
                    this.usersesc.push(userh[0]);
                    achei = true;
                    this.mesmodia.push(userh[0].userId);

                    // encontra primeiro dia da semana
                    const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                    const dia1formatado = moment
                      .utc(dia1semana)
                      .format('YYYY-MM-DD');
                    const mesmasemana = {dia: dia1formatado, id: userh[0].userId};
                    this.mesmasemana.unshift(mesmasemana);
                    break;
                  }
                }
                if (achei) {
                  break;
                }
              }
            }
          }

          // começo regra alone
          let sexoposto = ' ';
          const year = 0;
          if (p.pubs[0].userId != undefined && p.pubs[1].userId == undefined) {
            sexoposto = p.pubs[0].sex;
            const year = this.getAge(p.pubs[0].datebirth);
            for (let g = 0; g < this.usersesc.length; g++) {
              if (p.pubs[0].userId == this.usersesc[g].userId) {
                const useralone = this.usersesc.splice(g, 1);
                this.usersesc.unshift(useralone[0]);

                const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                const dia1formatado = moment.utc(dia1semana).format('YYYY-MM-DD');
                for (let m = 0; m < this.mesmasemana.length; m++) {
                  if (
                    this.mesmasemana[m].id == p.pubs[0].userId &&
                    this.mesmasemana[m].dia == dia1formatado
                  ) {
                    this.mesmasemana.splice(m, 1);
                    break;
                  }
                }

                for (let m = 0; m < this.mesmodia.length; m++) {
                  if (this.mesmodia[m] == p.pubs[0].userId) {
                    this.mesmodia.splice(m, 1);
                    break;
                  }
                }

                p.pubs[0] = new User();
                break;
              }
            }


            // sexo oposto

            for (let s = 0; s < p.npubs; s++) {
              if (p.pubs[s].userId == undefined) {
                for (let g = 0; g < this.usersesc.length; g++) {


                  // inicio do controle de dias especiais(congressos, assembleias)
                  if (especial.length > 0) {
                    let match = false;
                    for (let b = 0; b < especial.length; b++) {
                      if (
                        especial[b].circuito ==
                        this.usersesc[g].congregation['circuit'] ||
                        especial[b].circuito == 'TODOS'
                      ) {
                        match = true;
                        break;
                      }
                    }
                    if (match) {
                      continue;
                    }
                  }
                  // fim do controle de dias especiais


                  if (this.usersesc[g].sex == sexoposto) {
                    continue;
                  }


                  if (this.usersesc[g].conjuge) {
                    continue;
                  }

                  // nao deixa de menor de 17 sem responsavel(companheiro pai)

                  const idade = this.getAge(this.usersesc[g].datebirth);
                  if (contador > 1 && idade == 17) {
                    continue;

                  }
                  let idade2 = null;
                  if (s > 0) {

                    idade2 = this.getAge(p.pubs[s - 1].datebirth);
                  }


                  if (s > 0 && idade2 < 18 && idade < 18) {
                    continue;
                  }

                  if (this.usersesc[g].conjuge == null && idade < 17) {

                    continue;
                  }

                  if (s > 0 && idade == 17) {
                    if (p.pubs[s - 1].userId == undefined) {
                      continue;
                    }
                    try {
                      if (p.pubs[s - 1].congregation['nome'] != this.usersesc[g].congregation['nome']) {
                        continue;
                      }
                    } catch (e) {

                      console.log(e);


                    }

                  }

                  if (s > 0 && idade2 == 17 && idade >= 18) {

                    if (p.pubs[s - 1].congregation['nome'] != this.usersesc[g].congregation['nome']) {
                      continue;
                    }


                  }

                  // usuario agendado na semana nao eh designado
                  let semanaigualpre = false;
                  const dia1semanapre = moment.utc(this.dia).startOf('isoWeek');
                  const dia1formatadopre = moment
                    .utc(dia1semanapre)
                    .format('YYYY-MM-DD');
                  for (let m = 0; m < this.mesmasemana_agenda.length; m++) {
                    if (
                      this.mesmasemana_agenda[m].id == this.usersesc[g].userId &&
                      this.mesmasemana_agenda[m].dia == dia1formatadopre
                    ) {
                      semanaigualpre = true;
                      break;
                    }
                  }
                  if (semanaigualpre) {
                    continue;
                  }


                  /*  if (this.usersesc[g].sex == sexoposto) continue; */

                  // mantem irmãos juntos e irmãs juntas

                  // mantem irmãos juntos e irmãs juntas, e casais juntos
                  if (s > 0) {
                    if (p.pubs[s - 1].sex != this.usersesc[g].sex) {
                      continue;
                    }
                  }


                  // controla se existem usuários designados no mesmo dia
                  let diaigual = false;
                  for (let mdia = 0; mdia < this.mesmodia.length; mdia++) {
                    if (this.usersesc[g].userId == this.mesmodia[mdia]) {
                      diaigual = true;
                      break;
                    }
                  }
                  if (diaigual) {
                    continue;
                  }

                  // controla se existem usuários designados na mesma semana
                  let semanaigual = false;
                  // encontra primeiro dia da semana
                  const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                  const dia1formatado = moment.utc(dia1semana).format('YYYY-MM-DD');
                  for (let msem = 0; msem < this.mesmasemana.length; msem++) {
                    if (
                      this.mesmasemana[msem].id == this.usersesc[g].userId &&
                      this.mesmasemana[msem].dia == dia1formatado
                    ) {
                      semanaigual = true;
                      break;
                    }
                  }
                  if (semanaigual) {
                    continue;
                  }

                  let config = [];
                  config = this.usersesc[g].config;

                  let achei = false;
                  let dayoptionuser = this.dayoption;

                  if (dayoptionuser == 7) {
                    dayoptionuser = 0;
                  }
                  for (let i = 0; i < config[dayoptionuser].length; i++) {
                    if (config[dayoptionuser][i].hora == h.code) {
                      const newuser = this.makeNewUser(this.usersesc[g]);
                      newuser.tipoesc = 'E';
                      p.pubs[s] = newuser;
                      const userh = this.usersesc.splice(g, 1);
                      // userh[0].lastday = new Date(this.dia);
                      this.usersesc.push(userh[0]);
                      achei = true;
                      this.mesmodia.push(userh[0].userId);

                      // encontra primeiro dia da semana
                      const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                      const dia1formatado = moment
                        .utc(dia1semana)
                        .format('YYYY-MM-DD');
                      const mesmasemana = {
                        dia: dia1formatado,
                        id: userh[0].userId
                      };
                      this.mesmasemana.unshift(mesmasemana);
                      break;
                    }
                  }
                  if (achei) {
                    break;
                  }
                }
              }
            }

            // começo regra alone(sozinho no ponto)
            if (p.pubs[0].userId != undefined && p.pubs[1].userId == undefined) {

              for (let g = 0; g < this.usersesc.length; g++) {
                if (p.pubs[0].userId == this.usersesc[g].userId) {
                  const useralone = this.usersesc.splice(g, 1);
                  this.usersesc.unshift(useralone[0]);

                  const dia1semana = moment.utc(this.dia).startOf('isoWeek');
                  const dia1formatado = moment.utc(dia1semana).format('YYYY-MM-DD');
                  for (let m = 0; m < this.mesmasemana.length; m++) {
                    if (
                      this.mesmasemana[m].id == p.pubs[0].userId &&
                      this.mesmasemana[m].dia == dia1formatado
                    ) {
                      this.mesmasemana.splice(m, 1);
                      break;
                    }
                  }

                  for (let m = 0; m < this.mesmodia.length; m++) {
                    if (this.mesmodia[m] == p.pubs[0].userId) {
                      this.mesmodia.splice(m, 1);
                      break;
                    }
                  }

                  p.pubs[0] = new User();
                  break;
                }
              }
            }
          }

        }


      });

      if (h.vagas > 0) {
        escala.hora.push(h);
        escala.pontos.push(pontos_hora);
      }
    });

    for (let p = 0; p < escala.pontos.length; p++) {
      for (let u = 0; u < escala.pontos[p].length; u++) {
        for (let s = 0; s < escala.pontos[p][u].npubs; s++) {
          if (
            escala.pontos[p][u].pubs[s].userId == null ||
            escala.pontos[p][u].pubs[s].userId == undefined
          ) {
            if (s == 0) {
              this.reportvoid++;
            }
          } else {
            this.reportcount.push(escala.pontos[p][u].pubs[s].userId);

          }
        }
      }
    }

    this.escala.push(escala);
  }


  nextValidity(e: any) {
    let index = this.validities.indexOf(this.validity);
    index++;
    if (index > this.validities.length - 1) {
      index = this.validities.length - 1;
    }
    this.validity = this.validities[index] || {};
    this.datainicio = this.dateString(this.validity.begin);
    this.datafim = this.dateString(this.validity.end);
    this.escala = [];
    this.getEscala();
  }

  beforeValidity(e: any) {
    let index = this.validities.indexOf(this.validity);
    index--;
    if (index < 0) {
      index = 0;
    }
    this.validity = this.validities[index] || {};
    this.datainicio = this.dateString(this.validity.begin);
    this.datafim = this.dateString(this.validity.end);
    this.escala = [];
    this.getEscala();
  }

  dateString(data: Date) {
    return moment.utc(data).format('DD-MM-YYYY');
  }

  geraEscala() {
    this.diaatual = moment.utc(this.validity.begin).subtract(1, 'day');

    this.escala = [];

    this.mesmasemana = [];
    this.usersesc = [];
    this.reportcount = [];
    this.finalreport = [];
    this.reportvoid = 0;

    const usersort = this.users;

    for (let i = 0; i < usersort.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (usersort.length - i));

      const temp = usersort[j];
      usersort[j] = usersort[i];
      usersort[i] = temp;
    }

    usersort.sort(function (a, b) {
      if (!a.lastday) {
        return -1;
      }
      if (!b.lastday) {
        return 1;
      }
      return a.lastday > b.lastday ? 1 : a.lastday < b.lastday ? -1 : 0;
    });


    this.users = usersort;
    this.usersesc = this.users;

    // antecipa quem esta agendado para nao ser escalado na semana
    this.mesmasemana_agenda = [];
    for (let i = 0; i < this.agendas.length; i++) {
      const dia1semana = moment.utc(this.agendas[i].data).startOf('isoWeek');
      const dia1formatado = moment.utc(dia1semana).format('YYYY-MM-DD');
      const mesmasemana_agenda = {
        dia: dia1formatado,
        id: this.agendas[i].userId
      };

      this.mesmasemana_agenda.push(mesmasemana_agenda);
    }


    // inicia a geracao da escala

    while (this.diaatual < moment.utc(this.validity.end)) {
      this.mesmodia = [];

      this.diaatual = moment.utc(this.diaatual).add(1, 'day');
      this.dia = moment.utc(this.diaatual).format('YYYY-MM-DD');
      this.diasemana = moment
        .utc(this.dia)
        .locale('pt-br')
        .format('dddd');

      // regra feriado inicio
      if (this.buscaFeriado()) {
        this.dayoption = 7;
      } else {
        this.dayoption = this.diaatual.day();
      }
      // regra feriado fim

      this.pontos_dia = this.pontos.filter(
        a => a.config[this.dayoption].length > 0
      );

      this.carregaLayout();
    }

    for (let t = 0; t < this.users.length; t++) {
      const user = this.reportcount.filter(a => a == this.users[t].userId);
      const count = {
        nome: this.users[t].firstName,
        sobrenome: this.users[t].lastName,
        count: user.length
      };
      this.finalreport.push(count);
    }

    this.finalreport.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });

    this.showNow = true;
  }


  makeNewUser(user: User) {
    return new User(
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.congregation,
      user.circuito,
      user.mobilephone,
      user.phone,
      user.datebirth,
      user.responsable,
      user.conjuge,
      user.sex,
      user.privilege,
      user.eldermail,
      user.config,
      user.released,
      user.userId,
      user.lastday,
      user.role,
      user.agenda,
      user.escala,
      user.telegram
    );
  }

  buscaFeriado() {
    const feriado = this.feriados.filter(a => a.data == this.dia);
    if (feriado.length > 0) {
      return true;
    }
  }

  salvaEscala() {

    const resposta = prompt('Confirma salvar a escala? Digite: salvar',);
    if (resposta == 'salvar') {
      if (this.escala.length > 0) {
        this.authService.saveEscala(this.escala).subscribe(
          data => {
            this.authService.getEscala(this.datainicio).subscribe(escala => {
              this.escala = escala;
              if (this.escala.length > 0) {
                this.escala.sort(function (a, b) {
                  return a.data > b.data ? 1 : a.data < b.data ? -1 : 0;
                });
              }

              alert('A escala foi salva!');
              this.allowsave = false;
              this.allowdelete = true;

              this.authService.getlistusers_esc().subscribe((users: User[]) => {
                // this.users = users.filter(a => a.email != 'super@super.com');
                this.users = users;
                const usersort = this.users;

                for (let i = 0; i < usersort.length - 1; i++) {
                  const j = i + Math.floor(Math.random() * (usersort.length - i));

                  const temp = usersort[j];
                  usersort[j] = usersort[i];
                  usersort[i] = temp;
                }

                usersort.sort(function (a, b) {
                  return a.lastday > b.lastday ? 1 : a.lastday < b.lastday ? -1 : 0;
                });

                this.users = usersort;
              });


            });


          },
          error => console.error(error)
        );
      }
    }

  }

  deletaEscala() {

    const resposta = prompt('Tem certeza que quer deletar a Escala? Digite: deletar',);
    if (resposta == 'deletar') {
      if (this.escala.length > 0) {
        this.authService.deleteEscala(this.datainicio).subscribe(
          data => {
            alert('A escala foi deletada!');
            this.escala = [];
            this.allowsave = true;
            this.allowdelete = false;
            this.showNow = false;
            this.reportcount = [];
            this.reportvoid = 0;
            this.finalreport = [];
            this.authService.getlistusers_esc().subscribe((users: User[]) => {
              // this.users = users.filter(a => a.email != 'super@super.com');
              this.users = users;
              const usersort = this.users;

              for (let i = 0; i < usersort.length - 1; i++) {
                const j = i + Math.floor(Math.random() * (usersort.length - i));

                const temp = usersort[j];
                usersort[j] = usersort[i];
                usersort[i] = temp;
              }

              usersort.sort(function (a, b) {
                return a.lastday > b.lastday
                  ? 1
                  : a.lastday < b.lastday
                    ? -1
                    : 0;
              });

              this.users = usersort;
            });
          },
          error => console.error(error)
        );
      }
    }
  }

  verifyallowsave() {
    if (this.allowsave && this.escala.length > 0) {
      return false;
    }

    return true;
  }

  getEscala() {
    this.allowsave = false;
    this.allowdelete = false;
    this.showNow = false;
    this.reportcount = [];
    this.reportvoid = 0;
    this.finalreport = [];

    this.authService.getEscala(this.datainicio).subscribe(
      escala => {
        this.escala = escala;
        if (this.escala.length > 0) {
          this.escala.sort(function (a, b) {
            return a.data > b.data ? 1 : a.data < b.data ? -1 : 0;
          });

          this.authService.getAllLeds(this.datainicio).subscribe(
            leds => {

              for (let i = 0; i < this.escala.length; i++) {
                for (let p = 0; p < this.escala[i].pontos.length; p++) {
                  for (let u = 0; u < this.escala[i].pontos[p].length; u++) {
                    for (
                      let s = 0;
                      s < this.escala[i].pontos[p][u].npubs;
                      s++
                    ) {
                      if (
                        this.escala[i].pontos[p][u].pubs[s] == null ||
                        this.escala[i].pontos[p][u].pubs[s] == undefined
                      ) {
                        this.escala[i].pontos[p][u].pubs[s] = new User();
                        if (s == 0) {
                          this.reportvoid++;
                        }
                      } else {
                        this.reportcount.push(
                          this.escala[i].pontos[p][u].pubs[s].userId
                        );

                        const led = leds.find(a => {
                          if (
                            a.iduser == escala[i].pontos[p][u].pubs[s].userId &&
                            a.idescala == escala[i]._id &&
                            a.horacode == escala[i].hora[p].code
                          ) {
                            return true;
                          }
                        });

                        if (led != undefined) {
                          escala[i].pontos[p][u].pubs[s].sim = led.sim;
                          escala[i].pontos[p][u].pubs[s].nao = led.nao;
                        }

                        if (led != undefined && led.lock) {
                          escala[i].pontos[p][u].pubs[s] = led.sub;
                        }
                      }
                    }
                  }
                }
              }

              for (let t = 0; t < this.users.length; t++) {
                const user = this.reportcount.filter(
                  a => a == this.users[t].userId
                );
                const count = {
                  nome: this.users[t].firstName,
                  sobrenome: this.users[t].lastName,
                  count: user.length
                };
                this.finalreport.push(count);
              }

              this.finalreport.sort((a, b) => {
                if (a.nome < b.nome) {
                  return -1;
                }
                if (a.nome > b.nome) {
                  return 1;
                }
                return 0;
              });
            },
            error => console.error(error)
          );

          this.showNow = true;
          this.allowsave = false;
          this.allowdelete = true;
        } else {
          this.showNow = false;
          this.allowsave = true;
          this.allowdelete = false;
        }
      },
      error => console.error(error)
    );
  }

  sendTelegram() {

    const resposta = prompt('Confirma envio de telegrams? Digite: telegram',);
    if (resposta == 'telegram') {

      if (this.escala.length > 0) {
        this.authService.sendTelegram(this.datainicio).subscribe(
          data => {
            console.log(data);
            this.telegramreport = data;
            this.display = 'block';
            // alert("As notificações pelo Telegram foram enviadas!");
          },
          error => console.error(error)
        );
      }
    }
  }

  sendEmail() {

    const resposta = prompt('Confirma envio de emails? Digite: email',);
    if (resposta == 'email') {
      if (this.escala.length > 0) {
        this.authService.sendEmails(this.datainicio).subscribe(
          data => {
            console.log(data);
            this.emailreport = data;
            this.displaymail = 'block';
            // this.display = 'block';
            // alert("As notificações pelo Telegram foram enviadas!");
          },
          error => console.error(error)
        );
      }
    }
  }

  onClose() {
    this.display = 'none';
  }

  onClosemail() {
    this.displaymail = 'none';
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  initSocket() {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('grabEscala', data => {
      console.log(data);
      console.log('Evento capturado pelo client');
      if (this.escala.length > 0) {
        if (data.type == 'led') {
          console.log('led encontrado');
          let led = false;
          for (let i = 0; i < this.escala.length; i++) {
            if (led) {
              break;
            }
            for (let p = 0; p < this.escala[i].pontos.length; p++) {
              if (led) {
                break;
              }
              for (let u = 0; u < this.escala[i].pontos[p].length; u++) {
                if (led) {
                  break;
                }
                for (let s = 0; s < this.escala[i].pontos[p][u].npubs; s++) {
                  if (
                    this.escala[i].pontos[p][u].pubs[s].userId == data.iduser &&
                    this.escala[i]._id == data.idescala &&
                    this.escala[i].hora[p].code == data.horacode
                  ) {
                    this.escala[i].pontos[p][u].pubs[s].sim = data.sim;
                    this.escala[i].pontos[p][u].pubs[s].nao = data.nao;
                    console.log(
                      `led ${
                        this.escala[i].pontos[p][u].pubs[s].firstName
                        } modificado ${data.sim} ${data.nao}`
                    );
                    led = true;
                    break;
                  }
                }
              }
            }
          }
        } else if (data.type == 'sub') {
          console.log('sub encontrado');
          let led = false;
          for (let i = 0; i < this.escala.length; i++) {
            if (led) {
              break;
            }
            for (let p = 0; p < this.escala[i].pontos.length; p++) {
              if (led) {
                break;
              }
              for (let u = 0; u < this.escala[i].pontos[p].length; u++) {
                if (led) {
                  break;
                }
                for (let s = 0; s < this.escala[i].pontos[p][u].npubs; s++) {
                  if (
                    this.escala[i].pontos[p][u].pubs[s].userId == data.iduser &&
                    this.escala[i]._id == data.idescala &&
                    this.escala[i].hora[p].code == data.horacode
                  ) {
                    this.escala[i].pontos[p][u].pubs[s] = data.user;
                    console.log(
                      `sub ${
                        this.escala[i].pontos[p][u].pubs[s].firstName
                        } modificado ${data.sim} ${data.nao}`
                    );
                    led = true;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    });
  }
}
