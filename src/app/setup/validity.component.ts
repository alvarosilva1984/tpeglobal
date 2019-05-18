import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Validity} from './validity.model';
import 'moment/locale/pt-br';
import * as moment from 'moment';


@Component({
  selector: 'app-validity',
  templateUrl: './validity.component.html',
  styleUrls: ['./validity.component.css']
})

export class ValidityComponent implements OnInit {
  validityForm: FormGroup;
  validities: Validity[];


  display = 'none';
  showNow = false;

  edit = false;
  validityindex: number;

  auth = true;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {


    this.onAuth();
    this.validityForm = new FormGroup({
      begin: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required)
    });

    this.authService.getValidity().subscribe((validities: Validity[]) => {
        this.validities = validities;


      },
      error => console.error(error)
    );


  }


  onSubmit() {
    let year_begin = moment.utc(this.validityForm.value.begin).year();
    let month_begin = moment.utc(this.validityForm.value.begin).month();
    let day_begin = moment.utc(this.validityForm.value.begin).date();

    let year_end = moment.utc(this.validityForm.value.end).year();
    let month_end = moment.utc(this.validityForm.value.end).month();
    let day_end = moment.utc(this.validityForm.value.end).date();

    if (!this.edit) {


      const validity = new Validity(
        new Date(year_begin, month_begin, day_begin, 0, 0, 0),
        new Date(year_end, month_end, day_end, 0, 0, 0),
        false,
      );


      this.authService.validityCreate(validity).subscribe(
        data => {
          console.log(data);
          this.authService.getValidity().subscribe((validities: Validity[]) => {
            this.validities = validities;

          });
        },
        error => console.error(error)
      );


      this.validityForm.reset();


    } else {

      this.validities[this.validityindex].begin = new Date(year_begin, month_begin, day_begin, 0, 0, 0);
      this.validities[this.validityindex].end = new Date(year_end, month_end, day_end, 0, 0, 0);


      this.authService.validityEdit(this.validities[this.validityindex]).subscribe(
        data => {
          console.log(data);
          this.authService.getValidity().subscribe((validities: Validity[]) => {
            this.validities = validities;
          });
        },
        error => console.error(error)
      );

      this.validityForm.reset();
      this.onClose();
    }
  }

  onDelete(i) {

    const myvalidity = new Validity(
      this.validities[i].begin,
      this.validities[i].end,
      this.validities[i].status,
      this.validities[i].id
    );


    this.authService.deletevalidity(myvalidity).subscribe(result => {
        console.log(result);
        this.validities.splice(i, 1);
      },
      error => console.error(error)
    );

  }

  onEdit(i) {

    this.validityForm.setValue({
      begin: moment.utc(this.validities[i].begin).format('YYYY-MM-DD'),
      end: moment.utc(this.validities[i].end).format('YYYY-MM-DD')
    });


    this.edit = true;
    this.validityindex = i;
    this.display = 'block';
  }

  onClose() {
    this.display = 'none';
  }

  validMyForm() {
    if (!this.validityForm.valid) return true;

    return false;
  }

  onNewvalidity() {

    this.validityForm.reset();
    this.edit = false;
    this.display = 'block';
  }

  onAuth() {
    if (this.authService.isAuthenticated()) this.auth = false;
  }

  dateString(data: Date) {

    return moment.utc(data).format('DD-MM-YYYY');

  }

  onChangeStatus(e, status, j) {

    let achei = false;
    console.log('status ' + status + 'switch ' + this.validities[j].status);
    if (status) {
      for (let i = 0; i < this.validities.length; i++) {
        if (i == j) continue;
        if (this.validities[i].status) {
          e.target.checked = false;
          achei = true;
          break;

        }
      }

    }

    if (achei) {
      alert('Operação impossível! Só pode existir um período aberto.');
      return;

    }

    this.validities[j].status = status;

    this.authService.validityEdit(this.validities[j]).subscribe(
      data => {
        console.log(data);
        this.authService.getValidity().subscribe((validities: Validity[]) => {
          this.validities = validities;
        });
      },
      error => console.error(error)
    );


  }
}
