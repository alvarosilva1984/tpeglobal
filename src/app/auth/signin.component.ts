import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';


import {User} from './user.model';
import {AuthService} from './auth.service';

//import { CoolLocalStorage } from 'angular2-cool-storage';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  myForm: FormGroup;


  constructor(private authService: AuthService, private router: Router) {

  }

  onSubmit() {

    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {

          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('welcome', data.name);
          localStorage.setItem('cidade', data.cidade);


          this.authService.getPerfil()
            .subscribe(data => {
                console.log(data);
              },
              error => console.error(error)
            );
          this.router.navigateByUrl('/');

        },
        error => console.error(error)
      );


    this.myForm.reset();


  }

  ngOnInit() {
    localStorage.clear();
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, Validators.required)
    });
  }


  gotoforgotpass() {

    this.router.navigate(['/sendpass']);

  }

}
