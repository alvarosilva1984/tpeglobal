import { Injectable, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Ponto } from '../setup/ponto.model';
import { Feriado } from '../setup/feriado.model';
import { Hora } from '../setup/hora.model';
import { Circuito } from '../setup/circuito.model';
import { Congregation } from '../setup/congregation.model';
import { Validity } from '../setup/validity.model';
import { Especial } from '../setup/especial.model';
import { Sms } from '../testsms/sms.model';
import { Telegram } from '../testtelegram/telegram.model';
import { User } from './user.model';
import { Agenda } from '../schedule2/agenda.model';
import { ErrorService } from '../errors/error.service';
import { Body } from '@angular/http/src/body';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Newpass } from './newpass.model';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Anuncio } from '../anuncio/anuncio.model';
import { Perfilrole } from '../perfilrole/perfilrole.model';
import { environment } from "../../environments/environment";


@Injectable()
export class AuthService {
  router: Router;

  constructor(private http: Http, private errorService: ErrorService) {


  }

  private users: User[] = [];
  private euuser = new User('');
  perfil: User;
  perfilform: FormGroup;
  JwtHelper = new JwtHelper();
  pontos: Ponto[] = [];
  circuitos: Circuito[] = [];
  congregations: Congregation[] = [];
  horas: Hora[] = [];
  agendas: Agenda[] = [];
  feriados: Feriado[] = [];
  validities: Validity[] = [];
  anuncios: Anuncio[] = [];


  path = environment.apiUrl;

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.path + 'user', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {

    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.path + 'user/signin', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {

    return localStorage.getItem('token') !== null;
  }

  goOut() {

    if (localStorage.getItem('token') == null)
      this.router.navigateByUrl(this.path + 'auth/signin');

  }


  getlistusers() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'user/' + userId + token)
      .map((response: Response) => {
        const users = response.json().obj;
        const transformedMessages: User[] = [];
        for (const user of users) {
          transformedMessages.push(new User(
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
            user._id,
            user.lastday,
            user.role,
            user.agenda,
            user.escala,
            user.telegram
          )
          );
        }
        this.users = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }


  getlistAllUsers() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'user/all/' + userId + token)
      .map((response: Response) => {
        const users = response.json().obj;
        const transformedMessages: User[] = [];
        for (const user of users) {
          transformedMessages.push(new User(
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
            user._id,
            user.lastday,
            user.role,
            user.agenda,
            user.escala,
            user.telegram
          )
          );
        }
        this.users = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

  getlistusers_esc() {

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'user/useresc/' + userId + token)
      .map((response: Response) => {
        const users = response.json().obj;
        const transformedMessages: User[] = [];
        for (const user of users) {
          transformedMessages.push(new User(
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
            user._id,
            user.lastday,
            user.role,
            user.agenda,
            user.escala,
            user.telegram
          )
          );
        }
        this.users = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        localStorage.clear();
        return Observable.throw(error.json());
      });


  }



  updateReleased(user: User) {


    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch(this.path + 'user/' + user.userId + token, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  getPerfil() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(this.path + 'user/perfil/' + userId + token)
      .map((response: Response) => {
        const perfil = response.json().obj;
        this.perfil = new User(
          perfil.email,
          perfil.password,
          perfil.firstName,
          perfil.lastName,
          perfil.congregation,
          perfil.circuito,
          perfil.mobilephone,
          perfil.phone,
          perfil.datebirth,
          perfil.responsable,
          perfil.conjuge,
          perfil.sex,
          perfil.privilege,
          perfil.eldermail,
          perfil.config,
          perfil.released,
          perfil._id,
          perfil.lastday,
          perfil.role,
          perfil.agenda,
          perfil.escala,
          perfil.telegram
        );

        return this.perfil;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        localStorage.clear();
        return Observable.throw(error.json());
      });





  }

  getPerfilComp() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(this.path + 'user/perfilcomp/' + userId + token)
      .map((response: Response) => {
        const perfil = response.json().obj;
     /*    let conjuge = perfil.conjuge.firstname + ' ' + perfil.conjuge.lastNmae;
        let responsable = perfil.responsable.firstname + ' ' + perfil.lastNmae; */
        this.perfil = new User(
          perfil.email,
          perfil.password,
          perfil.firstName,
          perfil.lastName,
          perfil.congregation.nome,
          perfil.circuito.nome,
          perfil.mobilephone,
          perfil.phone,
          perfil.datebirth,
          perfil.responsable,
          perfil.conjuge,
          perfil.sex,
          perfil.privilege,
          perfil.eldermail,
          perfil.config,
          perfil.released,
          perfil._id,
          perfil.lastday,
          perfil.role,
          perfil.agenda,
          perfil.escala,
          perfil.telegram
        );

        return this.perfil;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        localStorage.clear();
        return Observable.throw(error.json());
      });





  }

  updatePerfil(user: User) {

    const userId = localStorage.getItem('userId');
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.put(this.path + 'user/' + userId + token, body, { headers: headers })
      .map((response: Response) => {
        const perfil = response.json().obj;
        this.perfil = new User(
          perfil.email,
          perfil.password,
          perfil.firstName,
          perfil.lastName,
          perfil.congregation,
          perfil.circuit,
          perfil.mobilephone,
          perfil.phone,
          perfil.datebirth,
          perfil.responsable,
          perfil.conjuge,
          perfil.sex,
          perfil.privilege,
          perfil.eldermail,
          perfil.config,
          perfil.released,
          perfil._id,
          perfil.lastday,
          perfil.role,
          perfil.agenda,
          perfil.escala,
          perfil.telegram
        );
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  get Perfil() {
    return this.perfil;
  }

  sendpass(user: User) {

    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.patch(this.path + 'user/sendpass', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        localStorage.clear();
        return Observable.throw(error.json());
      });


  }


  deleteuser(user) {

    const body = JSON.stringify(user);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete(this.path + 'user/' + user.userId + token, body)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        localStorage.clear();
        return Observable.throw(error.json());
      });
  }

  deleteponto(ponto: Ponto) {

    const body = JSON.stringify(ponto);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'pontos/' + ponto.id, body)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  newpass(newpass: Newpass) {

    const userId = localStorage.getItem('userId');
    const body = JSON.stringify(newpass);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch(this.path + 'user/newpass/' + userId + token, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        localStorage.clear();
        return Observable.throw(error.json());
      });
  }

  get Users() {

    return this.users;
  }

  isAuthenticated() {


    const decoded = this.JwtHelper.decodeToken(localStorage.getItem('token'));

    if (decoded.role == 'super')return true;

     return false;



  }

  isPleno() {


    const decoded = this.JwtHelper.decodeToken(localStorage.getItem('token'));

    if (decoded.role == 'pleno' ||
        decoded.role == 'super' )return true;


      return false;



  }

  isGold() {


    const decoded = this.JwtHelper.decodeToken(localStorage.getItem('token'));

    if (decoded.role == 'gold' ||
        decoded.role == 'super' )return true;


      return false;



  }

  isCtc() {


    const decoded = this.JwtHelper.decodeToken(localStorage.getItem('token'));

    if (decoded.role == 'ctc')return true;


      return false;



  }

  isBronze() {


    const decoded = this.JwtHelper.decodeToken(localStorage.getItem('token'));

    if (decoded.role == 'gold' ||
        decoded.role == 'super' ||
        decoded.role == 'pleno' )return true;


      return false;



  }


  pontocreate(pontos: Ponto) {
    const body = JSON.stringify(pontos);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  pontoImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('avatar', file, file.name);
    const headers = new Headers();


     return this.http.post(this.path + 'pontos/images', formData,
     {headers: headers})
     .map((response: Response) => response.json())
     .catch((error: Response) => {
       this.errorService.handleError(error.json());
       return Observable.throw(error.json());
     });
  }



  pontoUpdate(pontos: Ponto[]) {

    const body = JSON.stringify(pontos);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  pontoEdit(ponto: Ponto) {

    const body = JSON.stringify(ponto);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos/edit', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }





  getpontos() {


    return this.http.get(this.path + 'pontos')
      .map((response: Response) => {
        const pontos = response.json().obj;
        const transformedMessages: Ponto[] = [];
        for (const ponto of pontos) {
          const pubs: User[] = [];
          transformedMessages.push(new Ponto(
            ponto.name,
            ponto.npubs,
            ponto.date,
            ponto._id,
            pubs,
            ponto.config,
            ponto.address,
            ponto.obs,
            ponto.fileimg
          )
          );
        }
        this.pontos = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

  enviasms(sms: Sms) {
    const body = JSON.stringify(sms);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/sms', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  getsmscreditos() {

    return this.http.get(this.path + 'pontos/sms')
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }

  getsmsresposta(idresposta: string) {
    return this.http.get(this.path + 'pontos/smsresposta/' + idresposta)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  agendamento(agenda: Agenda) {
    const userId = localStorage.getItem('userId');
    agenda.userId = userId;
    const body = JSON.stringify(agenda);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.post(this.path + 'agendas', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });



  }


  getagendas() {
    const pubs: number[] = [];

    return this.http.get(this.path + 'agendas')
      .map((response: Response) => {
        const agendas = response.json().obj;
        const transformedMessages: Agenda[] = [];
        for (const agenda of agendas) {
          transformedMessages.push(new Agenda(
            agenda.data,
            agenda.datashow,
            agenda.hora,
            agenda.diasemana,
            agenda.code,
            agenda.user,
            agenda._id,
            agenda.sex

          )
          );
        }
        this.agendas = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }


  deleteagenda(agenda: Agenda) {

    const body = JSON.stringify(agenda);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'agendas/' + agenda.agendaId, body)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
    /*     .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
    });  */
  }




  horaCreate(hora: Hora) {
    const body = JSON.stringify(hora);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/hora', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  getHoras() {


    return this.http.get(this.path + 'pontos/hora')
      .map((response: Response) => {
        const horas = response.json().obj;
        const transformedMessages: Hora[] = [];
        for (const hora of horas) {
          transformedMessages.push(new Hora(
            hora.code,
            hora.hora,
            hora._id,
          )
          );
        }
        this.horas = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }


  deletehora(hora: Hora) {

    const body = JSON.stringify(hora);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'pontos/hora/' + hora.idhora, body)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  horaEdit(hora: Hora) {

    const body = JSON.stringify(hora);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos/hora/edit', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  feriadoCreate(feriado: Feriado) {
    const body = JSON.stringify(feriado);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/feriado', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }

  getFeriado() {


    return this.http.get(this.path + 'pontos/feriado')
      .map((response: Response) => {
        const feriados = response.json().obj;
        const transformedMessages: Feriado[] = [];
        for (const feriado of feriados) {
          transformedMessages.push(new Feriado(
            feriado.feriado,
            feriado.data,
            feriado.datashow,
            feriado._id,
          )
          );
        }
        this.feriados = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }



  deleteFeriado(feriado: Feriado) {

    const body = JSON.stringify(feriado);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'pontos/feriado/' + feriado.idferiado, body)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  feriadoEdit(feriado: Feriado) {

    const body = JSON.stringify(feriado);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos/feriado/edit', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }

  enviatelegram(telegram: Telegram) {
    const body = JSON.stringify(telegram);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/telegram', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  gettelegramresposta() {
    return this.http.get(this.path + 'pontos/telegramresposta')
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  circuitoCreate(circuito: Circuito) {
    const body = JSON.stringify(circuito);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/circuito', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  getCircuito() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'pontos/circuito/' + userId + token)
      .map((response: Response) => {
        const circuitos = response.json().obj;
        const transformedMessages: Circuito[] = [];
        for (const circuito of circuitos) {
          transformedMessages.push(new Circuito(
            circuito.nome,
            circuito._id,
          )
          );
        }
        this.circuitos = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

  getAllCircuito() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'pontos/circuito/all/' + userId + token)
      .map((response: Response) => {
        const circuitos = response.json().obj;
        const transformedMessages: Circuito[] = [];
        for (const circuito of circuitos) {
          transformedMessages.push(new Circuito(
            circuito.nome,
            circuito._id,
          )
          );
        }
        this.circuitos = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }


  deletecircuito(circuito: Circuito) {

    const body = JSON.stringify(circuito);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'pontos/circuito/' + circuito.id, body)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  circuitoEdit(circuito: Circuito) {

    const body = JSON.stringify(circuito);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos/circuito/edit', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }

  congregationEdit(congregation: Congregation) {

    const body = JSON.stringify(congregation);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos/congregation/edit', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  congregationCreate(congregation: Congregation) {
    const body = JSON.stringify(congregation);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/congregation', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  getCongregation() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'pontos/congregation/' + userId + token)
      .map((response: Response) => {
        const congregations = response.json().obj;
        const transformedMessages: Congregation[] = [];
        for (const congregation of congregations) {
          transformedMessages.push(new Congregation(
            congregation.nome,
            congregation.circuit,
            congregation._id,
          )
          );
        }
        this.congregations = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }


  getAllCongregation() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

    return this.http.get(this.path + 'pontos/congregation/all/' + userId + token)
      .map((response: Response) => {
        const congregations = response.json().obj;
        const transformedMessages: Congregation[] = [];
        for (const congregation of congregations) {
          transformedMessages.push(new Congregation(
            congregation.nome,
            congregation.circuit,
            congregation._id,
          )
          );
        }
        this.congregations = transformedMessages;
        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

/////////////////////////////
deleteespecial(especial: Especial) {

  const body = JSON.stringify(especial);
  const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';


  return this.http.delete(this.path + 'pontos/especial/' + especial.id, body)
    .map((response: Response) => response.json())
    .catch(function (error) {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });
}


///////////////
especialCreate(especial: Especial) {
  const body = JSON.stringify(especial);
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
  return this.http.post(this.path + 'pontos/especial', body, { headers: headers })
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      return Observable.throw(error.json());
    });

}


getespecial() {


  return this.http.get(this.path + 'pontos/especial')
    .map((response: Response) => {
      const especiais = response.json().obj;
      const transformedMessages: Especial[] = [];
      for (const especial of especiais) {
        transformedMessages.push(new Especial(
          especial.begin,
          especial.end,
          especial.circuito,
          especial.nome,
          especial._id
        )
        );
      }

      return transformedMessages;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });


}

especialEdit(especial: Especial) {

  const body = JSON.stringify(especial);
  const headers = new Headers({ 'Content-Type': 'application/json' });
  return this.http.put(this.path + 'pontos/especial/edit', body, { headers: headers })
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    });

}



  //////////////////////////////
  deletevalidity(validity: Validity) {

    const body = JSON.stringify(validity);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';

console.log('deletando', body);
    return this.http.delete(this.path + 'pontos/validity/' + validity.id, body )
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  ///////////////
  validityCreate(validity: Validity) {
    const body = JSON.stringify(validity);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'pontos/validity', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }


  getValidity() {


    return this.http.get(this.path + 'pontos/validity')
      .map((response: Response) => {
        const validities = response.json().obj;
        const transformedMessages: Validity[] = [];
        for (const validity of validities) {
          transformedMessages.push(new Validity(
            validity.begin,
            validity.end,
            validity.status,
            validity._id
          )
          );
        }

        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

  getLastValidity() {


    return this.http.get(this.path + 'pontos/validity/last')
      .map((response: Response) => {
        const validities = response.json().obj;
        const transformedMessages: Validity[] = [];
        for (const validity of validities) {
          transformedMessages.push(new Validity(
            validity.begin,
            validity.end,
            validity.status,
            validity._id
          )
          );
        }

        return transformedMessages;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

  validityEdit(validity: Validity) {

    const body = JSON.stringify(validity);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'pontos/validity/edit', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  deletecongregation(congregation: Congregation) {

    const body = JSON.stringify(congregation);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'pontos/congregation/' + congregation.id, body)
      .map((response: Response) => response.json())
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  saveEscala(escala) {
    const body = JSON.stringify(escala);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'escalas', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

  }

  deleteEscala(datainicio) {

    const body = JSON.stringify(datainicio);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';


    return this.http.delete(this.path + 'escalas/' + datainicio, body)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
    /*     .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
    });  */
  }


  getEscala(datainicio) {
    return this.http.get(this.path + 'escalas/' + datainicio)
      .map((response: Response) => {
        const escalas = response.json().obj;
        const transformedMessages = [];
        for (const escala of escalas) {
          transformedMessages.push(escala);
        }

        return transformedMessages;

      })
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  getPerfilEscala() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(this.path + 'escalas/perfil/' + userId + token)
      .map((response: Response) => {
        console.log('response', response);

         const escalas = response.json().obj;
         console.log('OOLHA ES', escalas);
         return escalas;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });


  }

  ledUpdate(escalaperfil) {
    const userId = localStorage.getItem('userId');
    const body = JSON.stringify(escalaperfil);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.path + 'escalas/led/' + userId, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }

  getLedsDesignations() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get(this.path + 'escalas/led/designations/' + userId + token)
      .map((response: Response) => {
         const leds = response.json().obj;
         return leds;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  getAllLeds(datainicio) {
    return this.http.get(this.path + 'escalas/led/all/' + datainicio)
      .map((response: Response) => {
        const leds = response.json().obj;
        return leds;

      })
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }


  getAllLedsReport(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.path + 'escalas/led/allreport', body, {headers: headers})
      .map((response: Response) => {
        const leds = response.json().obj;
        return leds;

      })
      .catch(function (error) {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });

  }




  sendTelegram(datainicio) {
    const body = JSON.stringify(datainicio);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'telegram/' + datainicio, body)
      .map((response: Response) => {

      const telegrams = response.json().obj;
      const transformedMessages = [];
      for (const telegram of telegrams) {
        transformedMessages.push(telegram);
      }

      return transformedMessages;
    })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

    }


  sendEmails(datainicio) {
    const body = JSON.stringify(datainicio);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post(this.path + 'email/' + datainicio, body)
      .map((response: Response) => {

      const emails = response.json().obj;
      const transformedMessages = [];
      for (const email of emails) {
        transformedMessages.push(email);
      }

      return transformedMessages;
    })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });

    }


cadastroTelegram( ) {
        const body = JSON.stringify('body');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.post(this.path + 'telegram/cadastro/' + userId, body)
          .map((response: Response) => {
          const code = response.json().obj;
          return code;


        })
          .catch((error: Response) => {
            return Observable.throw(error.json());
          });

        }

        telegramInfo( ) {
          const body = JSON.stringify('body');
          const headers = new Headers({ 'Content-Type': 'application/json' });
          const userId = localStorage.getItem('userId');
      return this.http.post(this.path + 'telegram/cadastro/grupo/' + userId, body)
            .map((response: Response) => {
              console.log(response,"aquii")
            return response;
  
  
          })
            .catch((error: Response) => {
              return Observable.throw(error.json());
            });
  
          }

        anuncioCreate(anuncio: Anuncio) {
          const body = JSON.stringify(anuncio);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
          return this.http.post(this.path + 'pontos/anuncio', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
              return Observable.throw(error.json());
            });

        }


        getAnuncio() {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

          return this.http.get(this.path + 'pontos/anuncio/' + userId + token)
            .map((response: Response) => {
              const anuncios = response.json().obj;
              const transformedMessages: Anuncio[] = [];
              for (const anuncio of anuncios) {
                transformedMessages.push(new Anuncio(
                  anuncio.titulo,
                  anuncio.mensagem,
                  anuncio.avisado,
                  anuncio._id,
                )
                );
              }
              this.anuncios = transformedMessages;
              return transformedMessages;
            })
            .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });


        }



        deleteAnuncio(anuncio: Anuncio) {

          const body = JSON.stringify(anuncio);
          const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';


          return this.http.delete(this.path + 'pontos/anuncio/' + anuncio.id, body)
            .map((response: Response) => response.json())
            .catch(function (error) {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });
        }

        anuncioEdit(anuncio: Anuncio) {

          const body = JSON.stringify(anuncio);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          return this.http.put(this.path + 'pontos/anuncio/edit', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });

        }


        avisaAnuncio(anuncio: Anuncio) {

          const body = JSON.stringify(anuncio);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          return this.http.put(this.path + 'pontos/anuncio/avisa', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });

        }



        perfilroleCreate(user: Perfilrole) {
          const body = JSON.stringify(user);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
          return this.http.post(this.path + 'pontos/perfilrole', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
              return Observable.throw(error.json());
            });

        }


        getPerfilrole() {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

          return this.http.get(this.path + 'pontos/perfilrole/' + userId + token)
            .map((response: Response) => {
              const perfilroles = response.json().obj;
              const transformedMessages: Perfilrole[] = [];

              for (const perfilrole of perfilroles) {
                const user: Perfilrole = {
                email: perfilrole.email,
                senha: '******',
                role: perfilrole.role,
                id: perfilrole.id
                };

                transformedMessages.push(user);
              }


              // this.perfilroles = transformedMessages;
              return transformedMessages;

            })
            .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });


        }



        deletePerfilrole(user: Perfilrole) {

          const body = JSON.stringify(user);
          const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';


          return this.http.delete(this.path + 'pontos/perfilrole/' + user.id, body)
            .map((response: Response) => response.json())
            .catch(function (error) {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });
        }

        perfilroleEdit(user: Perfilrole) {

          const body = JSON.stringify(user);
          const headers = new Headers({ 'Content-Type': 'application/json' });
          return this.http.put(this.path + 'pontos/perfilrole', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
            });

        }


  }



