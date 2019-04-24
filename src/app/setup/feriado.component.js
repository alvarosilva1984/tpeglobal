import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Feriado } from "./feriado.model";
import "moment/locale/pt-br";
import * as moment from "moment";
export class FeriadoComponent {
    constructor(authService) {
        this.authService = authService;
        this.display = "none";
        this.showNow = false;
        this.edit = false;
        this.auth = true;
    }
    ngOnInit() {
        this.onAuth();
        this.feriadoForm = new FormGroup({
            feriado: new FormControl(null, Validators.required),
            data: new FormControl(null, Validators.required)
        });
        this.authService.getFeriado().subscribe((feriados) => {
            this.feriados = feriados;
        }, error => console.error(error));
    }
    onSubmit() {
        if (!this.edit) {
            let dia = moment.utc(this.feriadoForm.value.data).format("YYYY-MM-DD");
            let datashow = moment
                .utc(this.feriadoForm.value.data)
                .format("DD-MM-YYYY");
            const feriado = new Feriado(this.feriadoForm.value.feriado, dia, datashow);
            this.authService.feriadoCreate(feriado).subscribe(data => {
                console.log(data);
                this.authService.getFeriado().subscribe((feriados) => {
                    this.feriados = feriados;
                });
            }, error => console.error(error));
            this.feriadoForm.reset();
        }
        else {
            this.feriados[this.feriadoindex].feriado = this.feriadoForm.value.feriado;
            let dia = moment.utc(this.feriadoForm.value.data).format("YYYY-MM-DD");
            let datashow = moment
                .utc(this.feriadoForm.value.data)
                .format("DD-MM-YYYY");
            this.feriados[this.feriadoindex].data = dia;
            this.feriados[this.feriadoindex].datashow = datashow;
            this.authService.feriadoEdit(this.feriados[this.feriadoindex]).subscribe(data => {
                console.log(data);
                this.authService.getFeriado().subscribe((feriados) => {
                    this.feriados = feriados;
                });
            }, error => console.error(error));
            this.feriadoForm.reset();
            this.onClose();
        }
    }
    onDelete(i) {
        const myferiado = new Feriado(this.feriados[i].feriado, this.feriados[i].data, this.feriados[i].datashow, this.feriados[i].idferiado);
        this.authService.deleteFeriado(myferiado).subscribe(result => {
            console.log(result);
            this.feriados.splice(i, 1);
        });
    }
    onEdit(i) {
        this.feriadoForm.setValue({
            feriado: this.feriados[i].feriado,
            data: moment.utc(this.feriados[i].data).format("YYYY-MM-DD")
        });
        //this.source = `/assets/img/${this.pontos[i].fileimg}`;
        this.edit = true;
        this.feriadoindex = i;
        this.display = "block";
    }
    onClose() {
        this.display = "none";
    }
    validMyForm() {
        if (!this.feriadoForm.valid)
            return true;
        return false;
    }
    onNewferiado() {
        this.feriadoForm.reset();
        this.edit = false;
        this.display = "block";
    }
    onAuth() {
        if (this.authService.isAuthenticated())
            this.auth = false;
    }
}
FeriadoComponent.decorators = [
    { type: Component, args: [{
                selector: "app-feriado",
                templateUrl: "./feriado.component.html",
                styleUrls: ["./feriado.component.css"]
            },] },
];
/** @nocollapse */
FeriadoComponent.ctorParameters = () => [
    { type: AuthService, },
];
