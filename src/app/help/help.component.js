import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
export class HelpComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.getPerfil()
            .subscribe(datauser => {
            console.log(datauser);
            this.authService.getCircuito()
                .subscribe(data => {
                console.log(data);
                this.circuitos = data;
                this.email = this.encontraCircuito(datauser.circuito);
            });
        });
    }
    encontraCircuito(id) {
        let email = " ";
        let circuit = this.circuitos.filter(a => a.id == id);
        if (circuit.length > 0) {
            switch (circuit[0].nome) {
                case 'SP-61':
                    email = 'tpe.santoandre.sp61@gmail.com';
                    break;
                case 'SP-76':
                    email = 'tpe.santoandre.sp76@gmail.com';
                    break;
                case 'SP-112':
                    email = 'tpe.santoandre.sp112@gmail.com';
                    break;
                case 'SP-139':
                    email = 'tpe.santoandre.sp139@gmail.com';
                    break;
                default:
                    email = 'tpe.santoandre.sp61@gmail.com';
            }
            return email;
        }
        else
            return " ";
    }
}
HelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-help',
                template: `
    <div class="container">
    <div class="col-md-6">
             <h4>Caso seus dados pessoais estejam incorretos, envie um email para:</h4>
             <p><a href="mailto:{{email}}">{{email}}</a></p>
             <h4>Encontrou um erro no funcionamento do site ou gostaria de enviar uma sugestão, mande um email para:</h4>
             <p><a href="mailto:suporte@tpesantoandre.com.br">suporte@tpesantoandre.com.br</a></p>
    </div>
    </div>
  
    `
            },] },
];
/** @nocollapse */
HelpComponent.ctorParameters = () => [
    { type: AuthService, },
];
