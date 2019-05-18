import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Ponto} from '../setup/ponto.model';
import 'moment/locale/pt-br';
import * as moment from 'moment';

@Component({
  selector: 'app-showpontos',
  templateUrl: './showpontos.component.html',
  styleUrls: ['./showpontos.component.css']
})


export class ShowpontosComponent implements OnInit {

  pontos: Ponto[];

  showNow = false;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {


    this.authService.getpontos().subscribe((pontos: Ponto[]) => {
      this.pontos = pontos;
      this.showNow = true;
    });
  }

  onTop() {

    window.scrollTo(0, 0);
  }


}
