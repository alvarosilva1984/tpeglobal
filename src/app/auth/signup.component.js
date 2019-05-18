import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Circuito} from "../setup/circuito.model";
import {Congregation} from "../setup/congregation.model";
import {Router} from "@angular/router";
import * as moment from 'moment';

export class SignupComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.isdisabled = true;
    this.isnew = true;
    this.greenHeader = 'black';
    this.circuitos = [];
    this.circuitos_all = [];
    this.circall = [];
    this.congregations = [];
    this.congregations_all = [];
    this.congall = [];
    this.isRequired = [];
    this.horas = [];
    this.pontos_dia = [];
    this.pontos = [];
    this.dayselect = 'Segunda-feira';
    this.diadasemana = 0;
    this.diasdasemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo", "Feriado"];
    this.config = [];
    this.users = [];
    this.responsables = [];
    this.conjuges = [];
    this.userall = [];
    this.index = 0;
    this.sex = ' ';
  }

  onSubmit() {
    let year_begin = moment.utc(this.myForm.value.datebirth).year();
    let month_begin = moment.utc(this.myForm.value.datebirth).month();
    let day_begin = moment.utc(this.myForm.value.datebirth).date();
    if (this.criarForm()) {
      const user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName, this.congregation.id, this.circuito.id, this.myForm.value.mobilephone, this.myForm.value.phone, new Date(year_begin, month_begin, day_begin, 0, 0, 0), this.responsable.userId, this.conjuge.userId, this.myForm.value.sex, this.myForm.value.privilege, this.myForm.value.eldermail, this.config, null, null, null, null);
      this.authService.signup(user)
        .subscribe(data => {
          console.log(data);
          alert("Usuário " + this.myForm.value.firstName + " cadastrado com sucesso!");
          this.myForm.reset();
          this.congregation = null;
          this.circuito = null;
          this.responsable = new User();
          this.conjuge = new User();
          this.config = [];
          this.config[0] = [];
          this.config[1] = [];
          this.config[2] = [];
          this.config[3] = [];
          this.config[4] = [];
          this.config[5] = [];
          this.config[6] = [];
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
              this.conjuges = usersort;
              this.responsables = usersort;
              this.userall = usersort;
            });
        }, error => console.error(error));
    } else {
      const user = new User(this.myForm.value.email, '******', this.myForm.value.firstName, this.myForm.value.lastName, this.congregation.id, this.circuito.id, this.myForm.value.mobilephone, this.myForm.value.phone, new Date(year_begin, month_begin, day_begin, 0, 0, 0), this.responsable.userId, this.conjuge.userId, this.myForm.value.sex, this.myForm.value.privilege, this.myForm.value.eldermail, this.config, null, this.userselected.userId, null, null);
      try {
        this.authService.updatePerfil(user)
          .subscribe(data => {
            console.log(data);
            this.doEnabled();
            alert("Dados Atualizados!");
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
              });
          }, error => console.error(error));
      } catch (e) {
        console.log("User not defined, page broken: " + e);
      }
    }
  }

  ngOnInit() {
    this.congregation = null;
    this.circuito = null;
    this.responsable = new User();
    this.conjuge = new User();
    this.userselected = new User();
    this.circselected = new Circuito();
    this.congselected = new Congregation();
    this.config[0] = [];
    this.config[1] = [];
    this.config[2] = [];
    this.config[3] = [];
    this.config[4] = [];
    this.config[5] = [];
    this.config[6] = [];
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
        this.conjuges = usersort;
        this.responsables = usersort;
        this.userall = usersort;
      });
    this.authService.getpontos()
      .subscribe((pontos) => {
        this.pontos = pontos;
        this.pontos_dia = this.pontos.filter(a => a.config[1].length > 0);
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
            this.horasExistentes();
          });
      }, error => console.error(error));
    this.authService.getCircuito()
      .subscribe((circuitos) => {
        this.circuitos = circuitos;
        this.circuitos_all = circuitos;
        this.circall = circuitos;
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
            this.congregations_all = congsort;
            this.congall = congsort;
          });
      });
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required),
      congregation: new FormControl(null, Validators.required),
      circuito: new FormControl(null, Validators.required),
      mobilephone: new FormControl(null),
      phone: new FormControl(null),
      datebirth: new FormControl(null, Validators.required),
      responsable: new FormControl(null),
      conjuge: new FormControl(null),
      sex: new FormControl(null, Validators.required),
      privilege: new FormControl(null, Validators.required),
      eldermail: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
    });
  }

  changeCongregation() {
    let cong = this.congregations_all;
    this.congregations = cong.filter(a => a.circuit == this.circuito.nome);
    this.congregation = null;
  }

  changeResponsableAndConjuge() {
    let resp = this.users;
    this.responsables = resp.filter(a => a.congregation == this.congregation.id);
    let conj = this.users;
    this.conjuges = conj.filter(a => {
      // if((a.congregation == this.congregation.id)&&(a.sex != this.userselected.sex))return true;
      if ((a.congregation == this.congregation.id) && (a.userId != this.userselected.userId))
        return true;
    });
    this.responsable = new User();
    this.conjuge = new User();
  }

  responsableNeed() {
    let age = this.getAge(this.mybirth);
    console.log("ageeeee", this.isRequired);
    if (age >= 0 && age <= 16) {
      this.myForm.controls.responsable.setValidators(Validators.required);
      this.myForm.controls.responsable.updateValueAndValidity();
      return true;
    }
    if (age > 16) {
      this.myForm.controls.responsable.setValidators(Validators.nullValidator);
      this.myForm.controls.responsable.setValue(null);
      this.myForm.controls.responsable.updateValueAndValidity();
      this.responsable = new User();
    }
    return false;
  }

  existConjuge() {
    let age = this.getAge(this.mybirth);
    if (age >= 0 && age <= 16) {
      return false;
    }
    return true;
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

  horasExistentes() {
    let day = 1;
    if (this.dayselect == 'Segunda-feira')
      day = 1;
    if (this.dayselect == 'Terça-feira')
      day = 2;
    if (this.dayselect == 'Quarta-feira')
      day = 3;
    if (this.dayselect == 'Quinta-feira')
      day = 4;
    if (this.dayselect == 'Sexta-feira')
      day = 5;
    if (this.dayselect == 'Sábado')
      day = 6;
    if (this.dayselect == 'Domingo')
      day = 0;
    this.pontos_dia = this.pontos.filter(a => a.config[day].length > 0);
    this.horas.map(b => {
      b.vagas = 0;
      b.dispo = 0;
    });
    console.log("this.horas", this.horas);
    console.log("this.pontos_dia", this.pontos_dia);
    this.pontos_dia.map(a => {
      for (let i = 0; i < a.config[day].length; i++) {
        this.horas.map(b => {
          if (b.code == a.config[day][i])
            b.vagas += a.npubs;
        });
      }
    });
    console.log("this.horas", this.horas);
    console.log("this.pontos_dia", this.pontos_dia);
  }

  anteriorDia(e) {
    this.diadasemana -= 1;
    if (this.diadasemana < 0)
      this.diadasemana = 6;
    this.dayselect = this.diasdasemana[this.diadasemana];
    this.horasExistentes();
  }

  proximoDia(e) {
    this.diadasemana += 1;
    if (this.diadasemana > 6)
      this.diadasemana = 0;
    this.dayselect = this.diasdasemana[this.diadasemana];
    this.horasExistentes();
  }

  changed(e, hora) {
    let config = {hora: " ", vezes: 1, contador: 0};
    config.hora = hora.code;
    let day = 0;
    if (this.dayselect == 'Segunda-feira')
      day = 1;
    if (this.dayselect == 'Terça-feira')
      day = 2;
    if (this.dayselect == 'Quarta-feira')
      day = 3;
    if (this.dayselect == 'Quinta-feira')
      day = 4;
    if (this.dayselect == 'Sexta-feira')
      day = 5;
    if (this.dayselect == 'Sábado')
      day = 6;
    if (this.dayselect == 'Domingo')
      day = 0;
    console.log(e);
    if (e == true) {
      this.config[day].push(config);
    } else {
      for (let i = 0; i < this.config[day].length; i++) {
        if (this.config[day][i].hora == config.hora) {
          this.config[day].splice(i, 1);
          break;
        }
      }
    }
  }

  valorCheck(hora) {
    let existe = [];
    let day = 0;
    if (this.dayselect == 'Segunda-feira')
      day = 1;
    if (this.dayselect == 'Terça-feira')
      day = 2;
    if (this.dayselect == 'Quarta-feira')
      day = 3;
    if (this.dayselect == 'Quinta-feira')
      day = 4;
    if (this.dayselect == 'Sexta-feira')
      day = 5;
    if (this.dayselect == 'Sábado')
      day = 6;
    if (this.dayselect == 'Domingo')
      day = 0;
    existe = this.config[day].filter(a => a.hora == hora.code);
    if (existe.length > 0)
      return true;
    return false;
  }

  setValuesToForm() {
    if (this.userselected) {
      let circuito = this.circuitos_all.filter(a => a.id == this.userselected.circuito);
      this.circuito = circuito[0];
      this.changeCongregation();
      let congregation = this.congregations.filter(a => a.id == this.userselected.congregation);
      this.congregation = congregation[0];
      this.changeResponsableAndConjuge();
      let conjuge = this.conjuges.filter(a => a.userId == this.userselected.conjuge);
      this.conjuge = conjuge[0];
      let responsable = this.responsables.filter(a => a.userId == this.userselected.responsable);
      this.responsable = responsable[0];
      this.myForm.setValue({
        firstName: this.userselected.firstName,
        lastName: this.userselected.lastName,
        email: this.userselected.email,
        congregation: this.congregation,
        circuito: this.circuito,
        mobilephone: this.userselected.mobilephone,
        phone: this.userselected.phone,
        datebirth: moment(this.userselected.datebirth).format("YYYY-MM-DD"),
        responsable: this.responsable || ' ',
        conjuge: this.conjuge || ' ',
        sex: this.userselected.sex,
        privilege: this.userselected.privilege,
        eldermail: this.userselected.eldermail,
        password: '******',
      });
      this.config = this.userselected.config;
    } else {
      this.myForm.reset();
      this.congregation = null;
      this.circuito = null;
      this.responsable = new User();
      this.conjuge = new User();
      this.userselected = new User();
      this.config = [];
      this.config[0] = [];
      this.config[1] = [];
      this.config[2] = [];
      this.config[3] = [];
      this.config[4] = [];
      this.config[5] = [];
      this.config[6] = [];
    }
  }

  userSelected() {
    return this.isnew;
  }

  vezesFds(eventVezes, hora) {
    console.log("vezes", eventVezes);
    if (this.dayselect == 'Sábado') {
      for (let i = 0; i < this.config[6].length; i++) {
        if (this.config[6][i].hora == hora)
          this.config[6][i].vezes = eventVezes;
      }
    }
    if (this.dayselect == 'Domingo') {
      for (let i = 0; i < this.config[0].length; i++) {
        if (this.config[0][i].hora == hora)
          this.config[0][i].vezes = eventVezes;
      }
    }
    console.log("config", this.config[6]);
  }

  valueInput(hora) {
    if (this.dayselect == 'Sábado') {
      for (let i = 0; i < this.config[6].length; i++) {
        if (this.config[6][i].hora == hora)
          return this.config[6][i].vezes;
      }
    }
    if (this.dayselect == 'Domingo') {
      for (let i = 0; i < this.config[0].length; i++) {
        if (this.config[0][i].hora == hora)
          return this.config[0][i].vezes;
      }
    }
    return 1;
  }

  doEnabled() {
    if (this.isdisabled) {
      this.myForm.controls.email.enable();
      this.myForm.controls.firstName.enable();
      this.myForm.controls.lastName.enable();
      this.myForm.controls.congregation.enable();
      this.myForm.controls.mobilephone.enable();
      this.myForm.controls.phone.enable();
      this.myForm.controls.datebirth.enable();
      this.myForm.controls.sex.enable();
      this.myForm.controls.privilege.enable();
      this.myForm.controls.eldermail.enable();
      this.myForm.controls.circuito.enable();
      this.myForm.controls.conjuge.enable();
      this.myForm.controls.responsable.enable();
      this.isdisabled = false;
    } else {
      this.myForm.controls.email.disable();
      this.myForm.controls.firstName.disable();
      this.myForm.controls.lastName.disable();
      this.myForm.controls.congregation.disable();
      this.myForm.controls.mobilephone.disable();
      this.myForm.controls.phone.disable();
      this.myForm.controls.datebirth.disable();
      this.myForm.controls.sex.disable();
      this.myForm.controls.privilege.disable();
      this.myForm.controls.eldermail.disable();
      this.myForm.controls.circuito.disable();
      this.myForm.controls.conjuge.disable();
      this.myForm.controls.responsable.disable();
      this.isdisabled = true;
    }
  }

  criarForm() {
    return this.isnew;
  }

  goCadastro() {
    if (this.isnew) {
      this.myForm.reset();
      this.congregation = null;
      this.circuito = null;
      this.responsable = new User();
      this.conjuge = new User();
      this.userselected = new User();
      this.circselected = new Circuito();
      this.congselected = new Congregation();
      this.config = [];
      this.config[0] = [];
      this.config[1] = [];
      this.config[2] = [];
      this.config[3] = [];
      this.config[4] = [];
      this.config[5] = [];
      this.config[6] = [];
      this.isdisabled = false;
      this.doEnabled();
      this.isnew = false;
    } else {
      this.myForm.reset();
      this.congregation = new Congregation();
      this.circuito = new Circuito();
      this.responsable = new User();
      this.conjuge = new User();
      this.userselected = new User();
      this.circselected = new Circuito();
      this.congselected = new Congregation();
      this.config = [];
      this.config[0] = [];
      this.config[1] = [];
      this.config[2] = [];
      this.config[3] = [];
      this.config[4] = [];
      this.config[5] = [];
      this.config[6] = [];
      this.isdisabled = true;
      this.doEnabled();
      this.isnew = true;
    }
  }

  onCirc() {
    if (this.circselected) {
      this.userall = this.users.filter(a => a.circuito == this.circselected.id);
      this.congall = this.congregations_all.filter(a => a.circuit == this.circselected.nome);
      this.myForm.reset();
      this.congregation = new Congregation();
      this.responsable = new User();
      this.conjuge = new User();
      this.userselected = new User();
      this.congselected = new Congregation();
      this.config = [];
      this.config[0] = [];
      this.config[1] = [];
      this.config[2] = [];
      this.config[3] = [];
      this.config[4] = [];
      this.config[5] = [];
      this.config[6] = [];
    } else {
      this.congall = this.congregations_all;
    }
  }

  onCong() {
    if (this.congselected) {
      this.userall = this.users.filter(a => a.congregation == this.congselected.id);
      this.myForm.reset();
      this.responsable = new User();
      this.conjuge = new User();
      this.userselected = new User();
      this.config = [];
      this.config[0] = [];
      this.config[1] = [];
      this.config[2] = [];
      this.config[3] = [];
      this.config[4] = [];
      this.config[5] = [];
      this.config[6] = [];
    } else {
      if (this.circselected) {
        this.userall = this.users.filter(a => a.circuito == this.circselected.id);
      } else {
        this.userall = this.users;
      }
    }
  }

  proximoUser(event) {
    if (this.userall.length > 0) {
      this.index = this.userall.indexOf(this.userselected);
      if (this.index < this.userall.length - 1) {
        this.index++;
        this.userselected = this.userall[this.index];
        this.setValuesToForm();
      }
    }
  }

  anteriorUser(event) {
    if (this.userall.length > 0) {
      this.index = this.userall.indexOf(this.userselected);
      if (this.index > 0) {
        this.index--;
        this.userselected = this.userall[this.index];
        this.setValuesToForm();
      }
    }
  }

  inputCheckCondition() {
    if (this.isdisabled == true && this.isnew == false) {
      return true;
    }
    return false;
  }

  inputCondition(hora) {
    if (this.isdisabled == true && this.isnew == false) {
      return true;
    }
    let existe = [];
    if (this.dayselect == 'Segunda-feira') {
      existe = this.config[1].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == 'Terça-feira') {
      existe = this.config[2].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == 'Quarta-feira') {
      existe = this.config[3].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == 'Quinta-feira') {
      existe = this.config[4].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == 'Sexta-feira') {
      existe = this.config[5].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == 'Sábado') {
      existe = this.config[6].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == 'Domingo') {
      existe = this.config[0].filter(a => a.hora == hora.code);
    }
    if (existe.length > 0)
      return false;
    return true;
  }

  validMyForm() {
    if (!this.myForm.valid)
      return true;
    if (this.isdisabled)
      return true;
    return false;
  }
}

SignupComponent.decorators = [
  {
    type: Component, args: [{
      selector: 'app-signup',
      templateUrl: './signup.component.html',
      styles: [`

   #firstName{
      text-transform: capitalize;
   }

   #lastName{
    text-transform: capitalize;
 }

      

.ng-valid:not(#userselected):not(#dayselected):not(form):not([type="checkbox"]):not(#circselected):not(#congselected){
        border-left: 5px solid #42A948; /* green */
      }

.ng-invalid:not(#userselected):not(#dayselected):not(form):not([type="checkbox"]):not(#circselected):not(#congselected){
        border-left: 5px solid #a94442; /* red */
      }

input[type=checkbox]
{
    border: none;
}

      table {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    
 td, th {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    
  tr:nth-child(even){background-color: #f2f2f2;}
    
 tr:hover {background-color: #ddd;}
    
 th {
        padding-top: 12px;
        padding-bottom: 12px;
        background-color: black;
        color: white;
    }




  `],
    },]
  },
];
/** @nocollapse */
SignupComponent.ctorParameters = () => [
  {type: AuthService,},
  {type: Router,},
];
