import { Component } from "@angular/core";
import { User } from "./user.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import * as moment from 'moment';
/* import { Date } from "core-js/library/web/timers";
import { Data } from "@angular/router/src/config"; */
//import {MomentModule} from 'angular2-moment/moment.module';
export class GeneralComponent {
    /* valor: boolean[] = [false, false, false, false, false, false, false,
            false, false, false, false, false, false, false,
            false, false, false, false, false, false, false]; */
    constructor(perfilService, router) {
        this.perfilService = perfilService;
        this.router = router;
        /*  greenHeader: string = 'black'; */
        this.isdisabled = true;
    }
    onSubmit() {
        const user = new User(this.perfilForm.value.email, '*', this.perfilForm.value.firstName, this.perfilForm.value.lastName, this.perfilForm.value.congregation, this.perfilForm.value.circuito, this.perfilForm.value.mobilephone, this.perfilForm.value.phone, this.perfilForm.value.datebirth, " ", " ", this.perfilForm.value.sex, this.perfilForm.value.privilege, this.perfilForm.value.eldermail, this.perfilForm.value.config, null, this.userselected.userId || this.perfilService.perfil.userId, this.perfilForm.value.lastday, null);
        try {
            console.log(user);
            this.perfilService.updatePerfil(user)
                .subscribe(data => {
                console.log(data);
                this.doEnabled();
                alert("Dados Atualizados!");
                this.perfilService.getlistusers()
                    .subscribe((usersall) => {
                    this.usersall = usersall;
                    let usersort = this.usersall;
                    usersort.sort((a, b) => {
                        if (a.firstName < b.firstName)
                            return -1;
                        if (a.firstName > b.firstName)
                            return 1;
                        return 0;
                    });
                    this.usersall = usersort;
                });
            }, error => console.error(error));
        }
        catch (e) {
            console.log("User not defined, page broken: " + e);
        }
    }
    ngOnInit() {
        this.perfilService.getPerfil()
            .subscribe(data => {
            console.log(data);
            this.perfilForm = new FormGroup({
                firstName: new FormControl({ value: this.perfilService.perfil.firstName, disabled: true }, Validators.required),
                lastName: new FormControl({ value: this.perfilService.perfil.lastName, disabled: true }, Validators.required),
                email: new FormControl({ value: this.perfilService.perfil.email, disabled: true }, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                password: new FormControl({ value: '*', disabled: true }, Validators.required),
                congregation: new FormControl({ value: this.perfilService.perfil.congregation, disabled: true }, Validators.required),
                mobilephone: new FormControl({ value: this.perfilService.perfil.mobilephone, disabled: true }, Validators.required),
                phone: new FormControl({ value: this.perfilService.perfil.phone, disabled: true }, Validators.required),
                datebirth: new FormControl({ value: moment.utc(this.perfilService.perfil.datebirth).format("YYYY-MM-DD"), disabled: true }, Validators.required),
                sex: new FormControl({ value: this.perfilService.perfil.sex, disabled: true }, Validators.required),
                privilege: new FormControl({ value: this.perfilService.perfil.privilege, disabled: true }, Validators.required),
                eldermail: new FormControl({ value: this.perfilService.perfil.eldermail, disabled: true }, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                lastday: new FormControl({ value: moment.utc(this.perfilService.perfil.lastday).format("YYYY-MM-DD") || null, disabled: true }),
            });
        }, error => console.error(error));
        try {
            this.perfilForm = new FormGroup({
                firstName: new FormControl({ value: this.perfilService.perfil.firstName, disabled: true }, Validators.required),
                lastName: new FormControl({ value: this.perfilService.perfil.lastName, disabled: true }, Validators.required),
                email: new FormControl({ value: this.perfilService.perfil.email, disabled: true }, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                password: new FormControl({ value: '*', disabled: true }, Validators.required),
                congregation: new FormControl({ value: this.perfilService.perfil.congregation, disabled: true }, Validators.required),
                mobilephone: new FormControl({ value: this.perfilService.perfil.mobilephone, disabled: true }, Validators.required),
                phone: new FormControl({ value: this.perfilService.perfil.phone, disabled: true }, Validators.required),
                datebirth: new FormControl({ value: moment.utc(this.perfilService.perfil.datebirth).format("YYYY-MM-DD"), disabled: true }, Validators.required),
                sex: new FormControl({ value: this.perfilService.perfil.sex, disabled: true }, Validators.required),
                privilege: new FormControl({ value: this.perfilService.perfil.privilege, disabled: true }, Validators.required),
                eldermail: new FormControl({ value: this.perfilService.perfil.eldermail, disabled: true }, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                lastday: new FormControl({ value: moment.utc(this.perfilService.perfil.lastday).format("YYYY-MM-DD") || null, disabled: true }),
            });
        }
        catch (e) {
            console.log("Indefinido: " + e);
            this.perfilForm = new FormGroup({
                firstName: new FormControl({ value: null, disabled: true }, Validators.required),
                lastName: new FormControl({ value: null, disabled: true }, Validators.required),
                email: new FormControl({ value: null, disabled: true }, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                password: new FormControl({ value: null, disabled: true }, Validators.required),
                congregation: new FormControl({ value: null, disabled: true }, Validators.required),
                mobilephone: new FormControl({ value: null, disabled: true }, Validators.required),
                phone: new FormControl({ value: null, disabled: true }, Validators.required),
                datebirth: new FormControl({ value: null, disabled: true }, Validators.required),
                sex: new FormControl({ value: null, disabled: true }, Validators.required),
                privilege: new FormControl({ value: null, disabled: true }, Validators.required),
                elder: new FormControl({ value: null, disabled: true }, Validators.required),
                eldermail: new FormControl({ value: null, disabled: true }, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                lastday: new FormControl({ value: null, disabled: true }),
            });
        }
        this.perfilService.getlistusers()
            .subscribe((usersall) => {
            this.usersall = usersall;
            let usersort = this.usersall;
            usersort.sort((a, b) => {
                if (a.firstName < b.firstName)
                    return -1;
                if (a.firstName > b.firstName)
                    return 1;
                return 0;
            });
            this.usersall = usersort;
        });
    }
    /*   changeValue(i: number) {
      
          
          } */
    loadPerfil() {
        /*
                    try {
                        this.perfilService.perfil.firstName;
                    }catch (e) {
                       this.perfilService.getPerfil()
                       .subscribe( data => {
                        console.log(data);
                        },
                        error => console.error(error)
                        );
                    } */
        this.perfilForm.setValue({
            firstName: this.perfilService.perfil.firstName,
            lastName: this.perfilService.perfil.lastName,
            email: this.perfilService.perfil.email,
            password: '*',
            congregation: this.perfilService.perfil.congregation,
            mobilephone: this.perfilService.perfil.mobilephone,
            phone: this.perfilService.perfil.phone,
            datebirth: moment.utc(this.perfilService.perfil.datebirth).format("YYYY-MM-DD"),
            sex: this.perfilService.perfil.sex,
            privilege: this.perfilService.perfil.privilege,
            eldermail: this.perfilService.perfil.eldermail,
            lastday: moment.utc(this.perfilService.perfil.lastday).format("YYYY-MM-DD") || null,
        });
    }
    doEnabled() {
        if (this.isdisabled) {
            this.perfilForm.controls.email.enable();
            this.perfilForm.controls.firstName.enable();
            this.perfilForm.controls.lastName.enable();
            this.perfilForm.controls.congregation.enable();
            this.perfilForm.controls.mobilephone.enable();
            this.perfilForm.controls.phone.enable();
            this.perfilForm.controls.datebirth.enable();
            this.perfilForm.controls.sex.enable();
            this.perfilForm.controls.privilege.enable();
            this.perfilForm.controls.elder.enable();
            this.perfilForm.controls.eldermail.enable();
            this.perfilForm.controls.lastday.enable();
            this.isdisabled = false;
        }
        else {
            this.perfilForm.controls.email.disable();
            this.perfilForm.controls.firstName.disable();
            this.perfilForm.controls.lastName.disable();
            this.perfilForm.controls.congregation.disable();
            this.perfilForm.controls.mobilephone.disable();
            this.perfilForm.controls.phone.disable();
            this.perfilForm.controls.datebirth.disable();
            this.perfilForm.controls.sex.disable();
            this.perfilForm.controls.privilege.disable();
            this.perfilForm.controls.eldermail.disable();
            this.perfilForm.controls.lastday.disable();
            this.isdisabled = true;
        }
    }
    selectmyuser(usersel) {
        this.perfilForm.setValue({
            firstName: usersel.firstName,
            lastName: usersel.lastName,
            email: usersel.email,
            password: '*',
            congregation: usersel.congregation,
            mobilephone: usersel.mobilephone,
            phone: usersel.phone,
            datebirth: moment.utc(usersel.datebirth).format("YYYY-MM-DD"),
            sex: usersel.sex,
            privilege: usersel.privilege,
            eldermail: usersel.eldermail,
            lastday: moment.utc(usersel.lastday).format("YYYY-MM-DD") || null,
        });
    }
}
GeneralComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-general',
                styles: [` 

label {
  display: inline-block;
  width: 140px;
  text-align: right;
}​

p{
    text-align: center;  
}

.available{
    vertical-align: middle;
}


.ng-valid:not(form){
    border-left: 5px solid #42A948; /* green */
  }
  .ng-invalid:not(form){
    border-left: 5px solid #a94442; /* red */
  }

  table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 90%;
}

td, th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

tr:nth-child(even){background-color: #f2f2f2;}

tr:hover {background-color: #ddd;}

th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: black;
    color: white;
}

input[type=checkbox] {
    transform: scale(2);
    -ms-transform: scale(2);
    -webkit-transform: scale(2);
    padding: 10px;
}
    

.form-control{

   width: 200px;
   
}


#btnchange{
    margin-top: 1px;
    margin-right: 2px;
    position:absolute;
    top:0;
    right:0;

}


    `],
                templateUrl: './general.component.html'
            },] },
];
/** @nocollapse */
GeneralComponent.ctorParameters = () => [
    { type: AuthService, },
    { type: Router, },
];
