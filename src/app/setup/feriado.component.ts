import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Feriado } from './feriado.model';
import 'moment/locale/pt-br';
import * as moment from 'moment';

@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css']
})
export class FeriadoComponent implements OnInit {
  feriadoForm: FormGroup;
  feriados: Feriado[];

  display = 'none';
  showNow = false;

  edit = false;
  feriadoindex: number;

  auth = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {


    this.onAuth();

    this.feriadoForm = new FormGroup({
        feriado: new FormControl(null, Validators.required),
        data: new FormControl(null, Validators.required)
    });

    this.authService.getFeriado().subscribe(
      (feriados: Feriado[]) => {
        this.feriados = feriados;
      },
      error => console.error(error)
    );
  }

  onSubmit() {
    if (!this.edit) {
      const dia = moment.utc(this.feriadoForm.value.data).format('YYYY-MM-DD');
      const datashow = moment
        .utc(this.feriadoForm.value.data)
        .format('DD-MM-YYYY');
      const feriado = new Feriado(
        this.feriadoForm.value.feriado,
        dia,
        datashow
      );

      this.authService.feriadoCreate(feriado).subscribe(
        data => {
          console.log(data);
          this.authService.getFeriado().subscribe((feriados: Feriado[]) => {
            this.feriados = feriados;
          });
        },
        error => console.error(error)
      );

      this.feriadoForm.reset();
    } else {
      this.feriados[this.feriadoindex].feriado = this.feriadoForm.value.feriado;
      const dia = moment.utc(this.feriadoForm.value.data).format('YYYY-MM-DD');
      const datashow = moment
        .utc(this.feriadoForm.value.data)
        .format('DD-MM-YYYY');
      this.feriados[this.feriadoindex].data = dia;
      this.feriados[this.feriadoindex].datashow = datashow;

      this.authService.feriadoEdit(this.feriados[this.feriadoindex]).subscribe(
        data => {
          console.log(data);
          this.authService.getFeriado().subscribe((feriados: Feriado[]) => {
            this.feriados = feriados;
          });
        },
        error => console.error(error)
      );

      this.feriadoForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {
    const myferiado = new Feriado(
      this.feriados[i].feriado,
      this.feriados[i].data,
      this.feriados[i].datashow,
      this.feriados[i].idferiado
    );

    this.authService.deleteFeriado(myferiado).subscribe(result => {
      console.log(result);
      this.feriados.splice(i, 1);
    });
  }

  onEdit(i) {
    this.feriadoForm.setValue({
      feriado: this.feriados[i].feriado,
      data: moment.utc(this.feriados[i].data).format('YYYY-MM-DD')
    });


    this.edit = true;
    this.feriadoindex = i;
    this.display = 'block';
  }

  onClose() {
    this.display = 'none';
  }

  validMyForm() {
    if (!this.feriadoForm.valid) return true;

    return false;
  }

  onNewferiado() {
    this.feriadoForm.reset();
    this.edit = false;
    this.display = 'block';
  }

  onAuth() {
    if (this.authService.isAuthenticated()) this.auth = false;
  }
}
