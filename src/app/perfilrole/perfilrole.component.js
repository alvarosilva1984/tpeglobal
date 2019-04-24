import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
export class PerfilroleComponent {
    constructor(authService) {
        this.authService = authService;
        this.display = "none";
        this.showNow = false;
        this.edit = false;
        this.auth = true;
    }
    ngOnInit() {
        this.onAuth();
        this.perfilroleForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            senha: new FormControl(null, Validators.required),
            role: new FormControl(null, Validators.required),
        });
        this.authService.getPerfilrole().subscribe((perfilroles) => {
            this.perfilroles = perfilroles;
        });
    }
    onSubmit() {
        if (!this.edit) {
            const perfilrole = {
                email: this.perfilroleForm.value.email,
                senha: this.perfilroleForm.value.senha,
                role: this.perfilroleForm.value.role,
            };
            this.authService.perfilroleCreate(perfilrole).subscribe(data => {
                console.log(data);
                this.authService.getPerfilrole().subscribe((perfilroles) => {
                    this.perfilroles = perfilroles;
                });
            }, error => console.error(error));
            this.perfilroleForm.reset();
        }
        else {
            this.perfilroles[this.perfilroleindex].email = this.perfilroleForm.value.email;
            this.authService.perfilroleEdit(this.perfilroles[this.perfilroleindex]).subscribe(data => {
                console.log(data);
                this.authService.getPerfilrole().subscribe((perfilroles) => {
                    this.perfilroles = perfilroles;
                });
            }, error => console.error(error));
            this.perfilroleForm.reset();
            this.onClose();
        }
    }
    onDelete(i) {
        const myperfilrole = {
            email: this.perfilroles[i].email,
            senha: this.perfilroles[i].senha,
            role: this.perfilroles[i].role,
            id: this.perfilroles[i].id
        };
        this.authService.deletePerfilrole(myperfilrole).subscribe(result => {
            console.log(result);
            this.perfilroles.splice(i, 1);
        });
    }
    onEdit(i) {
        this.perfilroleForm.setValue({
            email: this.perfilroles[i].email,
            senha: '******',
            role: this.perfilroles[i].role,
        });
        //this.source = `/assets/img/${this.pontos[i].fileimg}`;
        this.edit = true;
        this.perfilroleindex = i;
        this.display = "block";
    }
    onClose() {
        this.display = "none";
    }
    validMyForm() {
        if (!this.perfilroleForm.valid)
            return true;
        return false;
    }
    onNewperfilrole() {
        this.perfilroleForm.reset();
        this.edit = false;
        this.display = "block";
    }
    onAuth() {
        if (this.authService.isAuthenticated())
            this.auth = false;
    }
}
PerfilroleComponent.decorators = [
    { type: Component, args: [{
                selector: "app-perfilrole",
                templateUrl: "./perfilrole.component.html",
                styleUrls: ["./perfilrole.component.css"]
            },] },
];
/** @nocollapse */
PerfilroleComponent.ctorParameters = () => [
    { type: AuthService, },
];
