import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Congregation} from "./congregation.model";
import {Circuito} from "./circuito.model";

export class CongregationComponent {
  constructor(authService) {
    this.authService = authService;
    this.display = "none";
    this.showNow = false;
    this.edit = false;
    this.auth = true;
    this.mycircuit = new Circuito(" ");
  }

  ngOnInit() {
    this.onAuth();
    this.congregationForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      circuit: new FormControl(null, Validators.required)
    });
    this.authService.getCongregation().subscribe((congregations) => {
      this.congregations = congregations;
      this.authService.getCircuito()
        .subscribe((circuitos) => {
          this.circuitos = circuitos;
        });
    });
  }

  onSubmit() {
    if (!this.edit) {
      const congregation = new Congregation(this.congregationForm.value.nome, this.mycircuit.nome);
      this.authService.congregationCreate(congregation).subscribe(data => {
        console.log(data);
        this.authService.getCongregation().subscribe((congregations) => {
          this.congregations = congregations;
        });
      }, error => console.error(error));
      this.congregationForm.reset();
    } else {
      this.congregations[this.congregationindex].nome = this.congregationForm.value.nome;
      this.congregations[this.congregationindex].circuit = this.mycircuit.nome;
      this.authService.congregationEdit(this.congregations[this.congregationindex]).subscribe(data => {
        console.log(data);
        this.authService.getCongregation().subscribe((congregations) => {
          this.congregations = congregations;
        });
      }, error => console.error(error));
      this.congregationForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {
    const mycongregation = new Congregation(this.congregations[i].nome, this.congregations[i].circuit, this.congregations[i].id);
    this.authService.deletecongregation(mycongregation).subscribe(result => {
      console.log(result);
      this.congregations.splice(i, 1);
    });
  }

  onEdit(i) {
    let circuito = this.circuitos.filter((a) => a.nome == this.congregations[i].circuit);
    this.mycircuit = circuito[0];
    this.congregationForm.setValue({
      nome: this.congregations[i].nome,
      circuit: this.mycircuit
    });
    //this.source = `/assets/img/${this.pontos[i].fileimg}`;
    this.edit = true;
    this.congregationindex = i;
    this.display = "block";
  }

  onClose() {
    this.display = "none";
  }

  validMyForm() {
    if (!this.congregationForm.valid)
      return true;
    return false;
  }

  onNewCongregation() {
    this.congregationForm.reset();
    this.edit = false;
    this.display = "block";
  }

  onAuth() {
    if (this.authService.isAuthenticated())
      this.auth = false;
  }
}

CongregationComponent.decorators = [
  {
    type: Component, args: [{
      selector: "app-congregation",
      templateUrl: "./congregation.component.html",
      styleUrls: ["./congregation.component.css"]
    },]
  },
];
/** @nocollapse */
CongregationComponent.ctorParameters = () => [
  {type: AuthService,},
];
