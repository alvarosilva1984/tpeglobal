import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Newpass } from "./newpass.model";
import { AuthService } from "./auth.service";
export class NewpassComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isdisabled = true;
        this.changemode = true;
    }
    onSubmit() {
        const newpass = new Newpass(this.myForm.value.oldpassword, this.myForm.value.newpassword);
        this.myForm.reset();
        this.authService.newpass(newpass)
            .subscribe(data => {
            console.log(data);
            this.doEnabled(false);
            alert("Senha modificada!");
        }, error => console.error(error));
    }
    ngOnInit() {
        this.myForm = new FormGroup({
            oldpassword: new FormControl({ value: null, disabled: true }, Validators.required),
            newpassword: new FormControl({ value: null, disabled: true }, Validators.required)
        });
    }
    doEnabled(type) {
        if (type)
            this.myForm.reset();
        if (this.isdisabled) {
            this.myForm.controls.oldpassword.enable();
            this.myForm.controls.newpassword.enable();
            this.isdisabled = false;
            this.onChangeMode();
        }
        else {
            this.myForm.controls.oldpassword.disable();
            this.myForm.controls.newpassword.disable();
            this.isdisabled = true;
            this.onChangeMode();
        }
    }
    onChangeMode() {
        if (this.changemode)
            this.changemode = false;
        else
            this.changemode = true;
        return this.changemode;
    }
}
NewpassComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-newpass',
                templateUrl: './newpass.component.html',
                styles: [` 
    `]
            },] },
];
/** @nocollapse */
NewpassComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: Router, },
];
