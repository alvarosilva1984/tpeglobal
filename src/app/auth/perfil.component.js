import {Component} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Circuito} from "../setup/circuito.model";
import {Congregation} from "../setup/congregation.model";
import {Router} from "@angular/router";
import * as moment from "moment";

export class PerfilComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.isdisabled = true;
    this.isnew = true;
    this.greenHeader = "black";
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
    this.dayselect = "Segunda-feira";
    this.diadasemana = 0;
    this.diasdasemana = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
      "Feriado"
    ];
    this.config = [];
    this.users = [];
    this.responsables = [];
    this.conjuges = [];
    this.userall = [];
    this.index = 0;
    this.open = true;
    this.showDisponibilidade = false;
    this.changemode = true;
  }

  onSubmit() {
    const user = new User();
    user.userId = this.userselected.userId;
    user.config = this.config;
    if (this.userselected.conjuge)
      user.conjuge = this.userselected.conjuge['_id'];
    try {
      this.authService.updatePerfil(user).subscribe(data => {
        alert("Dados Atualizados!");
        this.doConfig();
        this.authService.getPerfilComp().subscribe(data => {
          console.log(data);
          this.userselected = data;
          this.setValuesToForm();
        }, error => console.error(error));
      }, error => console.error(error));
    } catch (e) {
      console.log("User not defined, page broken: " + e);
    }
  }

  ngOnInit() {
    this.open = true;
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
    this.myForm = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      congregation: new FormControl(null),
      circuito: new FormControl(null),
      mobilephone: new FormControl(null),
      phone: new FormControl(null),
      datebirth: new FormControl(null),
      responsable: new FormControl(null),
      conjuge: new FormControl(null),
      sex: new FormControl(null),
      privilege: new FormControl(null),
      eldermail: new FormControl(null)
    });
    this.doEnabled();
    this.authService.getPerfilComp().subscribe(data => {
      console.log(data);
      this.userselected = data;
      this.authService.getpontos().subscribe((pontos) => {
        this.pontos = pontos;
        this.pontos_dia = this.pontos.filter(a => a.config[1].length > 0);
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
          this.horasExistentes();
          this.setValuesToForm();
        }, error => console.error(error));
      }, error => console.error(error));
    }, error => console.error(error));
  }

  responsableNeed() {
    let age = this.getAge(this.mybirth);
    if (age >= 0 && age <= 16) {
      return true;
    }
    if (age > 16) {
      this.responsable = new User();
    }
    return false;
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
    if (this.dayselect == "Segunda-feira")
      day = 1;
    if (this.dayselect == "Terça-feira")
      day = 2;
    if (this.dayselect == "Quarta-feira")
      day = 3;
    if (this.dayselect == "Quinta-feira")
      day = 4;
    if (this.dayselect == "Sexta-feira")
      day = 5;
    if (this.dayselect == "Sábado")
      day = 6;
    if (this.dayselect == "Domingo")
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
    if (this.dayselect == "Segunda-feira")
      day = 1;
    if (this.dayselect == "Terça-feira")
      day = 2;
    if (this.dayselect == "Quarta-feira")
      day = 3;
    if (this.dayselect == "Quinta-feira")
      day = 4;
    if (this.dayselect == "Sexta-feira")
      day = 5;
    if (this.dayselect == "Sábado")
      day = 6;
    if (this.dayselect == "Domingo")
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
    if (this.dayselect == "Segunda-feira")
      day = 1;
    if (this.dayselect == "Terça-feira")
      day = 2;
    if (this.dayselect == "Quarta-feira")
      day = 3;
    if (this.dayselect == "Quinta-feira")
      day = 4;
    if (this.dayselect == "Sexta-feira")
      day = 5;
    if (this.dayselect == "Sábado")
      day = 6;
    if (this.dayselect == "Domingo")
      day = 0;
    existe = this.config[day].filter(a => a.hora == hora.code);
    if (existe.length > 0)
      return true;
    return false;
  }

  setValuesToForm() {
    if (this.userselected) {
      /*   let circuito = this.circuitos_all.filter(
              a => a.id == this.userselected.circuito
            );
            this.circuito = circuito[0];

            let congregation = this.congregations.filter(
              a => a.id == this.userselected.congregation
            );
            this.congregation = congregation[0];

            let conjuge = this.conjuges.filter(
              a => a.userId == this.userselected.conjuge
            );
            this.conjuge = conjuge[0];

            let responsable = this.responsables.filter(
              a => a.userId == this.userselected.responsable
            );
            this.responsable = responsable[0]; */
      let responsable = null;
      if (this.userselected.responsable)
        responsable = this.userselected['firstName'] + ' ' + this.userselected.responsable['lastName'];
      let conjuge = null;
      if (this.userselected.conjuge)
        conjuge = this.userselected.conjuge['firstName'] + ' ' + this.userselected.conjuge['lastName'];
      this.myForm.setValue({
        firstName: this.userselected.firstName,
        lastName: this.userselected.lastName,
        email: this.userselected.email,
        congregation: this.userselected.congregation,
        circuito: this.userselected.circuito,
        mobilephone: this.userselected.mobilephone,
        phone: this.userselected.phone,
        datebirth: moment(this.userselected.datebirth).format("YYYY-MM-DD"),
        responsable: responsable || " ",
        conjuge: conjuge || " ",
        sex: this.userselected.sex,
        privilege: this.userselected.privilege,
        eldermail: this.userselected.eldermail,
        password: "******"
      });
      this.config = this.userselected.config;
    }
  }

  userSelected() {
    return this.isnew;
  }

  vezesFds(eventVezes, hora) {
    console.log("vezes", eventVezes);
    if (this.dayselect == "Sábado") {
      for (let i = 0; i < this.config[6].length; i++) {
        if (this.config[6][i].hora == hora)
          this.config[6][i].vezes = eventVezes;
      }
    }
    if (this.dayselect == "Domingo") {
      for (let i = 0; i < this.config[0].length; i++) {
        if (this.config[0][i].hora == hora)
          this.config[0][i].vezes = eventVezes;
      }
    }
    console.log("config", this.config[6]);
  }

  valueInput(hora) {
    if (this.dayselect == "Sábado") {
      for (let i = 0; i < this.config[6].length; i++) {
        if (this.config[6][i].hora == hora)
          return this.config[6][i].vezes;
      }
    }
    if (this.dayselect == "Domingo") {
      for (let i = 0; i < this.config[0].length; i++) {
        if (this.config[0][i].hora == hora)
          return this.config[0][i].vezes;
      }
    }
    return 1;
  }

  doEnabled() {
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

  inputCheckCondition() {
    if (this.open)
      return true;
    return false;
  }

  inputCondition(hora) {
    if (this.open) {
      return true;
    }
    let existe = [];
    if (this.dayselect == "Segunda-feira") {
      existe = this.config[1].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == "Terça-feira") {
      existe = this.config[2].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == "Quarta-feira") {
      existe = this.config[3].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == "Quinta-feira") {
      existe = this.config[4].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == "Sexta-feira") {
      existe = this.config[5].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == "Sábado") {
      existe = this.config[6].filter(a => a.hora == hora.code);
    }
    if (this.dayselect == "Domingo") {
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

  doConfig() {
    if (this.open)
      this.open = false;
    else
      this.open = true;
    this.onChangeMode();
  }

  onChangeDisponiblidade() {
    if (this.showDisponibilidade)
      this.showDisponibilidade = false;
    else
      this.showDisponibilidade = true;
  }

  onChangeMode() {
    if (this.changemode)
      this.changemode = false;
    else
      this.changemode = true;
    return this.changemode;
  }
}

PerfilComponent.decorators = [
  {
    type: Component, args: [{
      selector: "app-signup",
      templateUrl: "./perfil.component.html",
      styles: [
        `

   #firstName{
      text-transform: capitalize;
   }

   #lastName{
    text-transform: capitalize;
 }

      


    .nav-link active { 
        cursor: pointer; 
        color: blue;
    
    }

    .nav-link { 
        cursor: pointer; 
     
    }
    
    .btn.btn-default{

        background-color: gray;
        color: white;
        width: 50px;
        height: 40px;
    
        }

.parent{
    display: inline-block;

}

.center{
    text-align:center;
}

  `
      ]
    },]
  },
];
/** @nocollapse */
PerfilComponent.ctorParameters = () => [
  {type: AuthService,},
  {type: Router,},
];
