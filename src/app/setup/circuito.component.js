import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Circuito} from "./circuito.model";

export class CircuitoComponent {
  constructor(authService) {
    this.authService = authService;
    this.display = "none";
    this.showNow = false;
    this.edit = false;
    this.auth = true;
  }

  ngOnInit() {
    this.onAuth();
    this.circuitoForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
    });
    this.authService.getCircuito().subscribe((circuitos) => {
      this.circuitos = circuitos;
    });
  }

  onSubmit() {
    if (!this.edit) {
      const circuito = new Circuito(this.circuitoForm.value.nome);
      this.authService.circuitoCreate(circuito).subscribe(data => {
        console.log(data);
        this.authService.getCircuito().subscribe((circuitos) => {
          this.circuitos = circuitos;
        });
      }, error => console.error(error));
      this.circuitoForm.reset();
    } else {
      this.circuitos[this.circuitoindex].nome = this.circuitoForm.value.nome;
      this.authService.circuitoEdit(this.circuitos[this.circuitoindex]).subscribe(data => {
        console.log(data);
        this.authService.getCircuito().subscribe((circuitos) => {
          this.circuitos = circuitos;
        });
      }, error => console.error(error));
      this.circuitoForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {
    const mycircuito = new Circuito(this.circuitos[i].nome, this.circuitos[i].id);
    this.authService.deletecircuito(mycircuito).subscribe(result => {
      console.log(result);
      this.circuitos.splice(i, 1);
    });
  }

  onEdit(i) {
    this.circuitoForm.setValue({
      nome: this.circuitos[i].nome
    });
    //this.source = `/assets/img/${this.pontos[i].fileimg}`;
    this.edit = true;
    this.circuitoindex = i;
    this.display = "block";
  }

  onClose() {
    this.display = "none";
  }

  validMyForm() {
    if (!this.circuitoForm.valid)
      return true;
    return false;
  }

  onNewCircuito() {
    this.circuitoForm.reset();
    this.edit = false;
    this.display = "block";
  }

  onAuth() {
    if (this.authService.isAuthenticated())
      this.auth = false;
  }
}

CircuitoComponent.decorators = [
  {
    type: Component, args: [{
      selector: "app-circuito",
      templateUrl: "./circuito.component.html",
      styleUrls: ["./circuito.component.css"]
    },]
  },
];
/** @nocollapse */
CircuitoComponent.ctorParameters = () => [
  {type: AuthService,},
];
