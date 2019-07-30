import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Hora} from './hora.model';


@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.css']
})

export class HoraComponent implements OnInit {
  horaForm: FormGroup;
  horas: Hora[];


  display = 'none';
  showNow = false;

  edit = false;
  horaindex: number;

  auth = true;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {


    this.onAuth();
    this.horaForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required)
    });

    this.authService.getHoras().subscribe((horas: Hora[]) => {
        this.horas = horas;


      },
      error => console.error(error)
    );


  }


  onSubmit() {
    if (!this.edit) {
      const hora = new Hora(
        this.horaForm.value.code,
        this.horaForm.value.hora
      );


      this.authService.horaCreate(hora).subscribe(
        data => {
          console.log(data);
          this.authService.getHoras().subscribe((horas: Hora[]) => {
            this.horas = horas;

          });
        },
        error => console.error(error)
      );


      this.horaForm.reset();


    } else {
      this.horas[this.horaindex].code = this.horaForm.value.code;
      this.horas[this.horaindex].hora = this.horaForm.value.hora;


      this.authService.horaEdit(this.horas[this.horaindex]).subscribe(
        data => {
          console.log(data);
          this.authService.getHoras().subscribe((horas: Hora[]) => {
            this.horas = horas;
          });
        },
        error => console.error(error)
      );

      this.horaForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {

    const myhora = new Hora(
      this.horas[i].code,
      this.horas[i].hora,
      this.horas[i].idhora
    );

    this.authService.deletehora(myhora).subscribe(result => {
      console.log(result);
      this.horas.splice(i, 1);
    });
  }

  onEdit(i) {

    this.horaForm.setValue({
      code: this.horas[i].code,
      hora: this.horas[i].hora
    });


    this.edit = true;
    this.horaindex = i;
    this.display = 'block';
  }

  onClose() {
    this.display = 'none';
  }

  validMyForm() {
    console.log(this.horaForm)
    if (!this.horaForm.valid) return true;

    return false;
  }

  onNewhora() {

    this.horaForm.reset();
    this.edit = false;
    this.display = 'block';
  }

  onAuth() {
    if (this.authService.isAuthenticated()) this.auth = false;
  }
}
