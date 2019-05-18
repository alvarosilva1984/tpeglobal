import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Anuncio} from '../anuncio/anuncio.model';


@Component({
  selector: 'app-anunciouser',
  templateUrl: './anunciouser.component.html',
  styleUrls: ['./anunciouser.component.css']
})

export class AnunciouserComponent implements OnInit {

  anuncios: Anuncio[];


  auth = true;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {


    this.authService.getAnuncio().subscribe((anuncios: Anuncio[]) => {
      this.anuncios = anuncios;

      this.anuncios.sort(function (a, b) {
        return (a.id > b.id) ? -1 : (a.id < b.id) ? 1 : 0;
      });

    });


  }


}
