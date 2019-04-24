import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
//import { CoolLocalStorage } from 'angular2-cool-storage';
export class SigninComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('welcome', data.name);
            this.authService.getPerfil()
                .subscribe(data => {
                console.log(data);
            }, error => console.error(error));
            this.router.navigateByUrl('/');
        }, error => console.error(error));
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
SigninComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-signin',
                templateUrl: './signin.component.html',
                styleUrls: ['./signin.component.css']
            },] },
];
/** @nocollapse */
SigninComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: Router, },
];
