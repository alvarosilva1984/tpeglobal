import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Especial} from "./especial.model";
import {Circuito} from "./circuito.model";
import 'moment/locale/pt-br';
import * as moment from 'moment';

export class EspecialComponent {
  constructor(authService) {
    this.authService = authService;
    this.mycircuit = new Circuito(" ");
    this.display = "none";
    this.showNow = false;
    this.edit = false;
    this.auth = true;
  }

  ngOnInit() {
    this.mycircuit = null;
    this.onAuth();
    this.especialForm = new FormGroup({
      begin: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      circuit: new FormControl(null, Validators.required),
      nome: new FormControl(null, Validators.required)
    });
    this.authService.getespecial().subscribe((especiais) => {
      this.especiais = especiais;
      this.authService.getCircuito()
        .subscribe((circuitos) => {
          this.circuitos = circuitos;
          let circ = new Circuito('TODOS', '1');
          this.circuitos.push(circ);
        });
    }, error => console.error(error));
  }

  onSubmit() {
    let year_begin = moment.utc(this.especialForm.value.begin).year();
    let month_begin = moment.utc(this.especialForm.value.begin).month();
    let day_begin = moment.utc(this.especialForm.value.begin).date();
    let year_end = moment.utc(this.especialForm.value.end).year();
    let month_end = moment.utc(this.especialForm.value.end).month();
    let day_end = moment.utc(this.especialForm.value.end).date();
    if (!this.edit) {
      const especial = new Especial(new Date(year_begin, month_begin, day_begin, 0, 0, 0), new Date(year_end, month_end, day_end, 0, 0, 0), this.mycircuit.nome, this.especialForm.value.nome);
      this.authService.especialCreate(especial).subscribe(data => {
        console.log(data);
        this.authService.getespecial().subscribe((especiais) => {
          this.especiais = especiais;
        });
      }, error => console.error(error));
      this.especialForm.reset();
    } else {
      this.especiais[this.especialindex].begin = new Date(year_begin, month_begin, day_begin, 0, 0, 0);
      this.especiais[this.especialindex].end = new Date(year_end, month_end, day_end, 0, 0, 0);
      this.especiais[this.especialindex].circuito = this.mycircuit.nome;
      this.especiais[this.especialindex].nome = this.especialForm.value.nome;
      this.authService.especialEdit(this.especiais[this.especialindex]).subscribe(data => {
        console.log(data);
        this.authService.getespecial().subscribe((especiais) => {
          this.especiais = especiais;
        });
      }, error => console.error(error));
      this.especialForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {
    const myespecial = new Especial(this.especiais[i].begin, this.especiais[i].end, this.especiais[i].circuito, this.especiais[i].nome, this.especiais[i].id);
    this.authService.deleteespecial(myespecial).subscribe(result => {
      console.log(result);
      this.especiais.splice(i, 1);
    });
  }

  onEdit(i) {
    let circuito = this.circuitos.filter((a) => a.nome == this.especiais[i].circuito);
    this.mycircuit = circuito[0];
    this.especialForm.setValue({
      begin: moment.utc(this.especiais[i].begin).format("YYYY-MM-DD"),
      end: moment.utc(this.especiais[i].end).format("YYYY-MM-DD"),
      circuit: this.mycircuit,
      nome: this.especiais[i].nome
    });
    //this.source = `/assets/img/${this.pontos[i].fileimg}`;
    this.edit = true;
    this.especialindex = i;
    this.display = "block";
  }

  onClose() {
    this.display = "none";
  }

  validMyForm() {
    if (!this.especialForm.valid)
      return true;
    return false;
  }

  onNewespecial() {
    this.especialForm.reset();
    this.edit = false;
    this.display = "block";
  }

  onAuth() {
    if (this.authService.isAuthenticated())
      this.auth = false;
  }

  dateString(data) {
    return moment.utc(data).format("DD-MM-YYYY");
  }
}

EspecialComponent.decorators = [
  {
    type: Component, args: [{
      selector: "app-especial",
      templateUrl: "./especial.component.html",
      styleUrls: ["./especial.component.css"]
    },]
  },
];
/** @nocollapse */
EspecialComponent.ctorParameters = () => [
  {type: AuthService,},
];
